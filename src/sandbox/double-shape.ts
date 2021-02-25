import { ClassValue, Falsy } from "../defs"

type ClassNamesDirect<K extends string = string> = Record<K, ClassValue>
// type ClassNamesToggle<K extends string = string> = Record<K, boolean>

type ClassNamingContext<S extends string, U extends string> = {
  className?: undefined|string
  classnames: ClassNamesDirect<S>
  applied?: Record<U, ClassValue|boolean>[]
}

export {
  _doubleShape
}

function _doubleShape<
  // A extends {[K in Exclude<S, U>]?: boolean} | {[K in Exclude<S, U>]?: ClassValue},
  A extends {[K in Exclude<S, U>]?: ClassValue | boolean},
  S extends string,
  U extends string = never,
>(
  ctx: ClassNamingContext<S, U>,
  withClassName: boolean,
  injection: undefined|string,
  ...args: (Falsy | A)[]
) {
  const {applied, classnames, className} = ctx  
  //@ts-expect-error
  , nextApplied = !applied ? [] : applied.push(...args.filter(Boolean)) as Record<U | keyof A, ClassValue|boolean>[] 

  , host = <
      // T extends {[K in Exclude<S, U | keyof A>]?: boolean} | {[K in Exclude<S, U | keyof A>]?: ClassValue}
      T extends {[K in Exclude<S, U>]?: ClassValue | boolean},
    >(
    withClassName: boolean,
    injection: undefined|string,  
    ...args: (Falsy | T)[]
  ) => _doubleShape(
    {classnames, className, applied: nextApplied},
    withClassName,
    injection,
    ...args
  )

  for (let i = args.length; i--; ) {
    const arg = args[i]
    if (!arg) {
      delete args[i]
      continue
    }

    const keys = Object.keys(arg) as (keyof typeof arg)[]
    for (let i = keys.length; i--;) {
      const key = keys[i]
      , v = arg[key]

      switch (v) {
        case undefined:
          break
        case false:
          delete keys[i]
          break
        case true:
          //@ts-expect-error
          keys[i] = classnames?.[key as unknown as S] ?? key
          break
        default:
          if (typeof v === "string")
            //@ts-expect-error
            keys[i] = v
      }
    }  
    
    const chunk = keys.flat().join(" ")
    if (!chunk)
      delete args[i]
    else
      //@ts-expect-error
      args[i] = chunk
  }

  const calced = [
    withClassName && className,
    injection,
    args.flat().join(" ")
  ].filter(Boolean)
  .join(" ")

  host["className"] = calced

  Object.defineProperty(host, Symbol.toPrimitive, {value: () => calced})

  return host
}