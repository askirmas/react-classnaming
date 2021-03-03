import type {
  CssModule,
  ClassHash,
  Falsy,
} from "./defs"
import {
  joinWithLead,
  resolver,
  wrapper
} from "./core"
import { emptize } from "./utils"
import {
  EMPTY_OBJECT,
  stackedKey
} from "./consts"
import type {
  ClassNaming,
  ClassNamingCall,
  ClassNamingThis,
  ActionsOf
} from "./index.types"

emptize(classes)

export type {
  ClassNames,
  ClassHash,
  ClassNamesProperty,
  ClassNamed
} from "./defs"
export default classNaming
export { classNamesCheck } from "./check"

/** Set context
 * @example
 * ```typescript
 *   const classes = classNaming(this.props)
 *   const classes = classNaming({classnames: require("./some.css"), className?})
 *   const classes = classNaming<Props>()
 *   const classes = classNaming<MyClassNames>()
 * ```
 */
function classNaming<
  Ctx extends {classnames: Source, className?: string},
  Source extends CssModule = Ctx["classnames"]
>(
  context: Ctx = EMPTY_OBJECT as Ctx
) {
  const {classnames, className = ""} = context
  classnames && emptize(classnames)
  
  const host: ClassNamingCall<Source, {}, Ctx["className"] extends string ? true : false> = (arg0?, arg1?) => classes({
    classnames,
    className,
    [stackedKey]: undefined
  },
    arg0,
    arg1
  )

  return wrapper(host, className)
}

/// CONTEXTED. TS-notation not matters

function classes<
  Source extends CssModule,
  Actions extends ActionsOf<Source>
>(
  {
    className,
    classnames,
    [stackedKey]: preStacked,
  }: ClassNamingThis<Source>,
  arg0?: Falsy | true | Actions,
  arg1?: Falsy | Actions
): ClassNaming<Source, {}, boolean> {
  const source = typeof arg0 === "object" ? arg0 as Actions: arg1 as Actions
  , allowed = source && resolver(classnames, source! /* TS-bug? `source` couldn't be `undefined`*/)
  , stacked = joinWithLead(preStacked, allowed)
  , result = arg0 === true && className
  ? joinWithLead(className, stacked)
  : stacked
  , host: ClassNamingCall<
    {[K in Exclude<keyof Source, keyof Actions>]: ClassHash},
    {},
    boolean
  > = (arg0?, arg1?) => classes({classnames, className, [stackedKey]: result},
    arg0,
    arg1
  )

  classnames && emptize(classnames)

  return wrapper(
    host,
    result,
  )
}   
