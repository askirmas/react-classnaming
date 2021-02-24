import type { Falsy, ToggleMap, ClassNamer, ClassNamed, ClassNamesMap, EmptyObject } from "./defs"
import {dehash, joinWithLead, truthyKeys, wrapper} from "./core"
import { emptize } from "./utils"


emptize(classNamer)

//TODO no `className` - no first `true`
interface tClassNaming<
  ClassKeys extends string,
  withClassNames extends boolean | undefined
> {
  /**
   * @example classes(true) === props.className
   * @example classes({class1: true, class2: false}) === "class1"
   * @example classes("class3", false && "class4") === "class3"
   * @example classes(true, {class1: true, class2: false}, "class3", false && "class4") === `${props.className} class1 class3`
  */
 // Using overloads will make error not in certain argument but on all call - 'No overload found'
  (
    propagate_or_map_or_expression?: true | ToggleMap<ClassKeys> | ClassKeys | Falsy,
    map_or_expression?: (
      [Extract<typeof propagate_or_map_or_expression, true>] extends [never]
      ? never
      : ToggleMap<ClassKeys>
    ) | ClassKeys | Falsy,
    ...expressions: (ClassKeys | Falsy)[]
  ) : ClassNamed & (
    withClassNames extends true
    ? {classnames: ClassNamesMap<ClassKeys>}
    : EmptyObject
  ) 
}

export default classNamingCtx

/**
 * @example const classes = classNamingCtx(this.props)
 * @example const classes = classNamingCtx({className, classnames})
 * @example const classes = classNamingCtx({classnames})
 */
function classNamingCtx<
  ClassKeys extends string,
  withClassNames extends boolean|undefined
>(
  {classnames, className}: ClassNamer<ClassKeys>,
  options?: ClassNamerOptions<withClassNames>
) {
  return classNamer.bind({classnames, className, options}) as tClassNaming<ClassKeys, withClassNames>
}

type ClassNamerOptions<
  withClassNames extends undefined|boolean
> = Partial<{
  withClassNames: withClassNames
  // withSelf: boolean
}>

function classNamer<
  ClassKeys extends string,
  withClassNames extends boolean|undefined
>(
  this: Partial<ClassNamer<ClassKeys> & {options: ClassNamerOptions<withClassNames>}>,
  arg0?: true | ToggleMap<ClassKeys> | ClassKeys,
  arg1?: ToggleMap<ClassKeys> | ClassKeys,
  ...args: (ClassKeys | Falsy)[]
): ClassNamed & Partial<Pick<typeof this, "classnames">> {
  const {
    className: propagated,
    classnames,
    options
  } = this
  , {
    withClassNames,
    // withSelf
  } = options ?? {}
  , withPropagation = arg0 === true
  , allowed: ClassKeys[] = truthyKeys(arg0 === true ? false : arg0)
  .concat(truthyKeys(arg1))
  //@ts-expect-error
  .concat(args)
  .filter<ClassKeys>(
    //@ts-expect-error
    Boolean
  )
  
  emptize(classnames)

  classnames && dehash(classnames, allowed)
  
  const className = joinWithLead(withPropagation && propagated, allowed)
  , host = classNamer.bind({classnames, className, options})

  withClassNames && (
    //@ts-expect-error
    host["classnames"] = classnames
  )
  return wrapper(
    host,
    className,
  )
}   