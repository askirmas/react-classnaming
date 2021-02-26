import type { ToggleMap, ClassNamer, ClassNamed, ClassNamesMap } from "./defs"
import {joinWithLead, resolver, wrapper} from "./core"
import { emptize } from "./utils"

emptize(classNamer)

//TODO no `className` - no first `true`
interface ClassNaming<
  Source extends ClassNamesMap
> extends ClassNamed {
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
}

export default classNamingCtx

/**
 * @example const classes = classNamingCtx(this.props)
 * @example const classes = classNamingCtx({className, classnames})
 * @example const classes = classNamingCtx({classnames})
 */
function classNamingCtx<
  Source extends ClassNamesMap,
>(
  {classnames, className}: ClassNamer<Source>,
) {
  return classNamer.bind({classnames, className, stacked: undefined}) as ClassNaming<Source>
}

function classNamer<
  Source extends ClassNamesMap
>(
  this: ClassNamer<Source> & {
    stacked: string|undefined
  },
  arg0?: true | ToggleMap<Source>,
  arg1?: typeof arg0 extends true ? ToggleMap<Source> : never,
): ClassNamed {
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
  , host = classNamer.bind({classnames, className, stacked})

  emptize(classnames)

  return wrapper(
    host,
    className,
  )
}   