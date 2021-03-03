import type {
  CssModule,
  ClassNamed,
  ClassHash,
  ClassNamesProperty,
  RequiredKeys
} from "./defs"
import type { stackedKey } from "./consts"


//TODO #11 no `className` - no first `true`
export type ClassNaming<Source extends CssModule, Used extends UsedActions> = ClassNamed & ClassNamingCall<Source, Used>
// Making as interface breaks stuff
export type ClassNamingCall<Source extends CssModule, Used extends UsedActions> =
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
  ) => ClassNamingReturn<Source, Used, Actions0 | Actions1>
;

type ClassNamingReturn<Source extends CssModule, Used extends UsedActions, Actions extends ActionsOf<Source>>
= ClassNaming<
{[K in Exclude<keyof Source,
  RequiredKeys<Actions> 
>]: Source[K]},
{[K in keyof Used
  | RequiredKeys<Actions> 
]: K extends keyof Used ? Used[K] : Actions[K]}
>

export type ActionsOf<Source extends CssModule> = {[K in keyof Source]?: Action}
type StrictSub<Actions extends ActionsOf<Source>, Source extends CssModule, Used extends UsedActions>
= Actions & {
  [K in keyof Actions]: K extends keyof Source ? K extends keyof Used ? never : Actions[K] : never
}

export type ClassNamingThis<Source extends CssModule> = ClassNamingContext<Source> & {
  [stackedKey]: string|undefined
}

type ClassNamingContext<T extends CssModule> = Partial<ClassNamed & {
  classnames: T
}>

type UsedActions = Record<string, Action>
// type BooleanMap = Record<string, boolean>

// type ActionToBool<A extends Action> = A extends string|undefined ? true : A

type Action = ClassHash|boolean

export type ClassNamesMap<Source extends CssModule> = (
/** Function to map one `classnames` to another
 * @example 
 * ```tsx
 *  <Component {...mapping<ComponentProps>({
 *    Container: { Root, "Theme--dark": true },
 *    Checked___true: { "Item--active": true },
 *    Checked___false: {}
 *  })}/>
 *```
  */
  <
    Target extends ClassNamesProperty<TargetClasses>,
    TargetClasses extends CssModule = CssModule
  >(map: {
    [T in keyof Target["classnames"]]:
      {[S in keyof Source]?: Action}
  }) => {classnames: {[T in keyof Target["classnames"]]: string}}
);
