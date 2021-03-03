import type {
  CssModule,
  ClassHash,
  ClassNamed,
  Action,
  RequiredKeys
} from "./defs"
import type { stackedKey } from "./consts"


//TODO #11 no `className` - no first `true`
export type ClassNaming<Source extends CssModule, Used extends CssModule> = ClassNamed & ClassNamingCall<Source, Used>
// Making as interface breaks stuff
export type ClassNamingCall<Source extends CssModule, Used extends CssModule> =
/** 
 * @example
 * ```typescript
 *   classes();
 *   classes(true);
 *   classes({App}); classes({App: true, "App--bad": false});
 * 
 *   const btn = classes({Btn})
 *   btn(true, {Btn__disabled: true});
 * ```
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
  Actions0 extends ActionsOf<Source>,
  Actions1 extends ActionsOf<Source>
 >(
    arg0?: true | StrictSub<Actions0, Source, Used>,
    arg1?: ActionsOf<Source> extends Actions0 ? StrictSub<Actions1, Source, Used> : never
  ) => ClassNaming<
    {[K in Exclude<keyof Source,
      RequiredKeys<Actions0> | RequiredKeys<Actions1>
    >]: ClassHash},
    {[K in keyof Used
      | RequiredKeys<Actions0> | RequiredKeys<Actions1>
    ]: ClassHash}
  >
;

export type ActionsOf<Source extends CssModule> = {[K in keyof Source]?: Action}
type StrictSub<Actions extends {[K in keyof Source]?: Action}, Source extends CssModule, Used extends CssModule>
= Actions & {
  [K in keyof Actions]: K extends keyof Source ? K extends keyof Used ? never : Action : never
}

export type ClassNamingThis<Source extends CssModule> = ClassNamingContext<Source> & {
  [stackedKey]: string|undefined
}

type ClassNamingContext<T extends CssModule> = Partial<ClassNamed & {
  classnames: T
}>
