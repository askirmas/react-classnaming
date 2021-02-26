import type { ToggleMap, ClassNamingContext, ClassNamed, ClassNamesMap } from "./defs"
import {joinWithLead, resolver, wrapper} from "./core"
import { emptize } from "./utils"

emptize(classNamingCtx)

interface ClassNamingCall<Source extends ClassNamesMap> {
/**
   * @example classes(true) === props.className
   * @example classes({class1: true, class2: false}) === "class1"
   * @example classes(true, {class1: true, class2: false})
  */
  // Using overloads will make error not in certain argument but on all call - 'No overload found'
  (
    ctx_or_propagate_or_map_or_expression?: ClassNamingContext<Source> | true | ToggleMap<Source>,
    map_or_expression?: [Extract<typeof ctx_or_propagate_or_map_or_expression, true>] extends [never]
    ? never
    : ToggleMap<Source>
  ): ClassNaming<Source>
  // (propagateClassName: true): ClassNaming<Source>
  // (expression: ToggleMap<Source>): ClassNaming<Source>
  // (propagateClassName: true, expression: ToggleMap<Source>): ClassNaming<Source>
}

//TODO no `className` - no first `true`
interface ClassNaming<Source extends ClassNamesMap> extends ClassNamed, ClassNamingCall<Source> {}

type ClassNamingThis<Source extends ClassNamesMap> = ClassNamingContext<Source> & {
  //TODO change to Symbol
  stacked: string|undefined
}

export default classNamingCtx

/**
 * @example const classes = classNamingCtx(this.props)
 * @example const classes = classNamingCtx({className, classnames})
 * @example const classes = classNamingCtx({classnames})
 */

function classNamingCtx<
  Source extends ClassNamesMap
>(
  this: void | ClassNamingThis<Source>,
  // arg0?: typeof this extends void ? ClassNamingContext<Source> : (true | ToggleMap<Source>),
  // arg1?: typeof this extends void ? never : typeof arg0 extends true ? ToggleMap<Source> : never,
  arg0?: ClassNamingContext<Source> | (true | ToggleMap<Source>),
  arg1?: typeof arg0 extends true ? ToggleMap<Source> : never,

  ): ClassNaming<Source> {
  // istanbul ignore next //TODO Solve TS tricks with context
  const thisArg = this || {}
  
  context_assign:
  if (!("stacked" in thisArg)) {
    const {classnames, className} = arg0 as ClassNamingContext<Source>
    emptize(classnames)
    const host: ClassNamingCall<Source>
    //@ts-expect-error //TODO solve it
    = classNamingCtx.bind({classnames, className, stacked: undefined}) 

    return wrapper(host, className)
  }

  const {
    className,
    classnames,
    stacked: preStacked,
  } = thisArg as ClassNamingThis<Source>
  , withPropagation = arg0 === true  
  , source = typeof arg0 === "object" ? arg0 as ToggleMap<Source>: arg1
  , allowed = source && resolver(classnames, source)
  , stacked = joinWithLead(preStacked, allowed)
  , result = joinWithLead(withPropagation && className, stacked)
  , host: ClassNamingCall<Source>
  //@ts-expect-error //TODO solve it
  = classNamingCtx.bind({classnames, className, stacked})

  classnames && emptize(classnames)

  return wrapper(
    host,
    result,
  )
}   