import type { Falsy, ToggleMap, ClassValue, ClassNamer, ClassNamed } from "./defs"
import { emptize, stringifyClassNamed, truthyKeys } from "./utils"

interface tClassNaming<ClassKeys extends string> {
  /**
   * @example classes(true) === props.className
   * @example classes({class1: true, class2: false}) === "class1"
   * @example classes("class3", false && "class4") === "class3"
   * @example classes(true, {class1: true, class2: false}, "class3", false && "class4") === `${props.className} class1 class3`
  */
 // Using overloads will make error not in certain argument but on all call - 'No overload found'
  (
    propagate_or_map_or_expression: true | ToggleMap<ClassKeys> | ClassKeys | Falsy,
    map_or_expression?: (
      [Extract<typeof propagate_or_map_or_expression, true>] extends [never]
      ? never
      : ToggleMap<ClassKeys>
    ) | ClassKeys | Falsy,
    ...expressions: (ClassKeys | Falsy)[]
  ) : ClassNamed
}

export default classNamingCtx

/**
 * @example const classes = classNamingCtx(this.props)
 * @example const classes = classNamingCtx({className, classNames})
 * @example const classes = classNamingCtx({classNames})
 */
function classNamingCtx<ClassKeys extends string>(ctx: ClassNamer<ClassKeys>): tClassNaming<ClassKeys> {
  emptize(ctx.classNames)

  return classNamer.bind(ctx) as tClassNaming<ClassKeys>
}

function classNamer<ClassKeys extends string>(
  this: ClassNamer<ClassKeys>,
  arg0: true | ToggleMap<ClassKeys> | ClassKeys,
  arg1?: ToggleMap<ClassKeys> | ClassKeys,
  ...args: (ClassKeys | Falsy)[]
): ClassNamed {
  const {className, classNames} = this
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