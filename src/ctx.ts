import type { Falsy, ToggleMap, ClassValue, ClassNamer, ClassNamed } from "./defs"
import { emptize, stringifyClassNamed, truthyKeys } from "./utils"

export default classNamingCtx

function classNamingCtx<ClassKeys extends string>(ctx: ClassNamer<ClassKeys>) {
  emptize(ctx.classNames)
  
  const {classNames, className} = ctx

  return function classNamer/*<ClassKeys extends string>*/(
    // this: ClassNamer<ClassKeys>,
    //TODO (typeof className extends string ? true : never)
    arg0: ToggleMap<ClassKeys> | ClassKeys | true,
    arg1?: [Extract<typeof arg0, boolean>] extends [never]
    ? (ClassKeys | Falsy)
    : (ToggleMap<ClassKeys> | ClassKeys | Falsy),
    ...args: (ClassKeys | Falsy)[]
  ): ClassNamed {
    // const {className, classNames} = this
    const withPropagation = arg0 === true
    , allowed: ClassKeys[] = truthyKeys(arg0 === true ? false : arg0)
    //@ts-expect-error
    .concat(truthyKeys(arg1))
    //@ts-expect-error
    .concat(args)
    .filter<ClassKeys>(
      //@ts-expect-error
      Boolean
    )
    
    for (let i = allowed.length; i--;) {
      const key = allowed[i]
      , hash: ClassValue = classNames[key]
      
      if (hash !== undefined)
        //@ts-expect-error
        allowed[i] = hash
    }
    
    const allowedString = allowed.join(" ")
    , propagated = withPropagation && className || ""
    , $return = {
      className: `${
        propagated
      }${
        propagated && allowedString
        ? " "
        : ""
      }${
        allowedString
      }`
    }
    
    stringifyClassNamed($return)

    return $return
  }    
}

