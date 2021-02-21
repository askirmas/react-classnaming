export type { ClassNames } from "./defs"
import type { Falsy, ToggleMap, ClassValue, ClassNamer } from "./defs"
import { emptize, stringifyClassNamed, truthyKeys } from "./utils"

export default classNamingCtx

function classNamingCtx<ClassKeys extends string>(ctx: ClassNamer<ClassKeys>) {
  emptize(ctx.classNames)
  return classNamer.bind(ctx)
}

function classNamer<ClassKeys extends string>(
  this: ClassNamer<ClassKeys>,
  //TODO (typeof className extends string ? true : never)
  arg0: ToggleMap<ClassKeys> | ClassKeys | true,
  arg1?: [Extract<typeof arg0, boolean>] extends [never]
  ? (ClassKeys | Falsy)
  : (ToggleMap<ClassKeys> | ClassKeys | Falsy),
  ...args: (ClassKeys | Falsy)[]
) {
  const {className, classNames} = this
  , withPropagation = arg0 === true
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

