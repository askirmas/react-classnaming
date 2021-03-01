import type {
  CssModule,
  ClassHash,
  ClassNamed,
  Action,
  RequiredKeys
} from "./defs"
import {
  joinWithLead,
  resolver,
  wrapper
} from "./core"
import { emptize } from "./utils"
import { EMPTY_OBJECT, stackedKey } from "./consts"

emptize(classNaming)
emptize(_classNaming)

export type { ClassNames, ClassHash, ClassNamesProperty, ClassNamed } from "./defs"
export default classNaming
export {classNamesCheck} from "./check"

/** Set context
 * @example ```typescript
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
  emptize(classnames)
  
  const host: ClassNamingCall<Source, {}> = _classNaming.bind({
    classnames,
    className,
    [stackedKey]: undefined
  })

  return wrapper(host, className)
}

/// CONTEXTED. TS-notation not matters

function _classNaming<
  Source extends CssModule,
  Actions extends undefined | {[K in keyof Source]?: Action}
>(
  this: ClassNamingThis<Source>,
  arg0?: string | true | {[K in keyof Actions]: K extends keyof Source ? Action : never},
  arg1?: [Extract<typeof arg0, undefined|true|string>] extends [never] ? never : Actions
): ClassNaming<Source, {}> {
  const {
    className,
    classnames,
    [stackedKey]: preStacked,
  } = this
  , withPropagation = arg0 === true  
  , source = typeof arg0 === "object" ? arg0 as Actions: arg1 as Actions
  , allowed = source && resolver(classnames, source!)
  , withInjection = typeof arg0 !== "string" ? preStacked : joinWithLead(preStacked, arg0)
  , stacked = joinWithLead(withInjection, allowed)
  , result = joinWithLead(withPropagation && className, stacked)
  , host: ClassNamingCall<
    {[K in Exclude<keyof Source, keyof Actions>]: ClassHash},
    {}
  >
  = _classNaming.bind({classnames, className, [stackedKey]: stacked})

  emptize(classnames)

  return wrapper(
    host,
    result,
  )
}   

// Making as interface breaks stuff
type ClassNamingCall<Source extends CssModule, Used extends CssModule> =
/** More
 * @example
 *   classes();
 *   classes(true); classes("App");
 *   classes({App}); classes({App: true, "App--bad": false});
 * 
 *   const btn = classes(className, {Btn})
 *   btn({Btn__disabled: true});
 * @example
 * ```tsx
 *   <div {...classes(...)} />
 *   <div data-block={`${classes(...)}`} />
 *   <Component {...{
 *     ...classes(...)(...)(...)},
 *     ...classnames
 *   }/>
 * ```
 */
 <
  Actions0 extends {[K in keyof Source]?: Action},
  Actions1 extends {[K in keyof Source]?: Action}
 >(
    arg0?: true | string | Actions0
    & {[K in keyof Actions0]: K extends keyof Source ? K extends keyof Used ? never : Action : never},
    arg1?: {[K in keyof Source]?: Action} extends Actions0 ? Actions1
    & {[K in keyof Actions1]: K extends keyof Source ? K extends keyof Used ? never : Action : never} : never
  ) => ClassNaming<
    {[K in Exclude<keyof Source,
      RequiredKeys<Actions0> | RequiredKeys<Actions1>
    >]: ClassHash},
    {[K in keyof Used
      | RequiredKeys<Actions0> | RequiredKeys<Actions1>
    ]: ClassHash}
  >
;

//TODO #11 no `className` - no first `true`
type ClassNaming<Source extends CssModule, Used extends CssModule> = ClassNamed & ClassNamingCall<Source, Used>

type ClassNamingThis<Source extends CssModule> = ClassNamingContext<Source> & {
  [stackedKey]: string|undefined
}

type ClassNamingContext<T extends CssModule> = Partial<ClassNamed & {
  classnames: T
}>
