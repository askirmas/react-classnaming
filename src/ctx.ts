export type { ClassNames } from "./defs"
import type { ClassNamesMap, Falsy, ToggleMap, ClassValue } from "./defs"
import { emptize, stringifyClassNamed, truthyKeys } from "./utils"

export default classNamingCtx

function classNamingCtx<ClassKeys extends string>({
  classNames, className
}: {
  className?: string
  classNames: ClassNamesMap<ClassKeys>
}) {
  emptize(classNames)

  return function classNamer(
    //TODO (typeof className extends string ? true : never)
    arg0: ToggleMap<ClassKeys> | ClassKeys | true,
    arg1?: [Extract<typeof arg0, boolean>] extends [never]
    ? (ClassKeys | Falsy)
    : (ToggleMap<ClassKeys> | ClassKeys | Falsy),
    ...args: (ClassKeys | Falsy)[]
  ) {

    const withPropagation = arg0 === true
    //@ts-expect-error
    , allowed: ClassKeys[] = truthyKeys(arg0 === true ? false : arg0)
    //@ts-expect-error
    .concat(truthyKeys(arg1))
    //@ts-expect-error
    .concat(args)
    .filter(Boolean)
    
    for (let i = allowed.length; i--;) {
      const key = allowed[i]
      , hash: ClassValue = classNames[key]
      
      if (hash !== undefined)
        //@ts-expect-error
        allowed[i] = hash
    }
    
    const classNameString = `${
      className && withPropagation
      ? `${className} `
      : ""
    }${
      allowed.join(" ")
    }`

    return stringifyClassNamed({
      className: classNameString
    })
  }  
}
