import type {
  CssModule,
  ClassHash,
  Action,
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

emptize(classNaming)
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
  
  const host: ClassNamingCall<Source, {}> = (arg0?, arg1?) => classes({
    classnames,
    className,
    [stackedKey]: undefined
  },
    //@ts-expect-error //TODO #21
    arg0,
    arg1
  )

  return wrapper(host, className)
}

/// CONTEXTED. TS-notation not matters

function classes<
  Source extends CssModule,
  Actions extends undefined | ActionsOf<Source>
>(
  ctx: ClassNamingThis<Source>,
  arg0?: true | {[K in keyof Actions]: K extends keyof Source ? Action : never},
  arg1?: [Extract<typeof arg0, undefined|true>] extends [never] ? never : Actions
): ClassNaming<Source, {}> {
  const {
    className,
    classnames,
    [stackedKey]: preStacked,
  } = ctx
  , withPropagation = arg0 === true  
  , source = typeof arg0 === "object" ? arg0 as Actions: arg1 as Actions
  , allowed = source && resolver(classnames, source! /* TS-bug? `source` couldn't be `undefined`*/)
  , stacked = joinWithLead(preStacked, allowed)
  , result = joinWithLead(withPropagation && className, stacked)
  , host: ClassNamingCall<
    {[K in Exclude<keyof Source, keyof Actions>]: ClassHash},
    {}
  > = (arg0?, arg1?) => classes({classnames, className, [stackedKey]: result},
    //@ts-expect-error //TODO #21
    arg0,
    arg1
  )

  classnames && emptize(classnames)

  return wrapper(
    host,
    result,
  )
}   
