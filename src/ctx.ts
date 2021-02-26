import type { ToggleMap, ClassNamingContext, ClassNamed, ClassNamesMap } from "./defs"
import {joinWithLead, resolver, wrapper} from "./core"
import { emptize } from "./utils"

emptize(classNamer)

interface ClassNamingCall<Source extends ClassNamesMap> {
/**
   * @example classes(true) === props.className
   * @example classes({class1: true, class2: false}) === "class1"
   * @example classes(true, {class1: true, class2: false})
  */
  // Using overloads will make error not in certain argument but on all call - 'No overload found'
  (
    propagate_or_map_or_expression?: true | ToggleMap<Source>,
    map_or_expression?: [Extract<typeof propagate_or_map_or_expression, true>] extends [never]
    ? never
    : ToggleMap<Source>
  ): ClassNaming<Source>
  // (propagateClassName: true): ClassNaming<Source>
  // (expression: ToggleMap<Source>): ClassNaming<Source>
  // (propagateClassName: true, expression: ToggleMap<Source>): ClassNaming<Source>
}

//TODO no `className` - no first `true`
interface ClassNaming<Source extends ClassNamesMap> extends ClassNamed, ClassNamingCall<Source> {}

export default classNamingCtx

/**
 * @example const classes = classNamingCtx(this.props)
 * @example const classes = classNamingCtx({className, classnames})
 * @example const classes = classNamingCtx({classnames})
 */
function classNamingCtx<
  Source extends ClassNamesMap,
>(
  {classnames, className}: ClassNamingContext<Source>,
): ClassNaming<Source> {
  const host: ClassNamingCall<Source> = classNamer.bind({classnames, className, stacked: undefined})

  return wrapper(host, className)
}

function classNamer<
  Source extends ClassNamesMap
>(
  this: ClassNamingContext<Source> & {
    stacked: string|undefined
  },
  arg0?: true | ToggleMap<Source>,
  arg1?: ToggleMap<Source>,
): ClassNaming<Source> {
  const {
    className: propagated,
    classnames,
    stacked: preStacked,
  } = this
  , withPropagation = arg0 === true
  
  , source = typeof arg0 === "object" ? arg0 : arg1
  , allowed = source && resolver(classnames, source)
  , stacked = joinWithLead(preStacked, allowed)
  , className = joinWithLead(withPropagation && propagated, stacked)
  , host: ClassNamingCall<Source> = classNamer.bind({classnames, className, stacked})

  emptize(classnames)

  return wrapper(
    host,
    className,
  )
}   