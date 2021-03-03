import type {
  CssModule,
  ClassNamed,
  ClassHash,
  ClassNamesProperty,
  RequiredKeys,
  AnyObject,
  Falsy
} from "./defs"
import type { stackedKey } from "./consts"


//TODO #11 no `className` - no first `true`
export type ClassNaming<Source extends CssModule, Used extends BoolDict, WithClassName extends boolean> = ClassNamed & ClassNamingCall<Source, Used, WithClassName>
// Making as interface breaks stuff
export type ClassNamingCall<Source extends CssModule, Used extends BoolDict, WithClassName extends boolean> =
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
  Actions0 extends {[K in keyof Source]?: Action},
  Actions1 extends {[K in keyof Source]?: Action},
  ApplyClassName extends WithClassName|false = false
 >(
  arg0?: ApplyClassName | Falsy | StrictSub<Used, Source, Actions0>,
  arg1?: ApplyClassName extends true ? Falsy |StrictSub<Used, Source, Actions1> : never
) => ClassNamingReturn<
  ApplyClassName extends true ? false : WithClassName,
  {[K in keyof Used | RequiredKeys<Actions0 | Actions1>]: K extends keyof Used ? Used[K] : Bool<Actions0[K]>},
  Source
>;

type ClassNamingReturn<WithClassName extends boolean, Used extends BoolDict, Source extends CssModule>
= ClassNaming<
  {[K in Exclude<keyof Source,
    RequiredKeys<Used> 
  >]: Source[K]},
  Used,
  WithClassName
>

export type ActionsOf<Source extends CssModule> = {[K in keyof Source]?: Action}

type StrictSub<Used extends BoolDict, Source extends CssModule, Actions extends ActionsOf<Source>>
= Extract<Actions, AnyObject> & {
  [K in keyof Actions]: K extends keyof Source
  ? K extends keyof Used ? never
  // : Actions[K]
  : Actions[K] extends boolean
    ? Actions[K]
    : Actions[K] extends ClassHash
      ? [Extract<Actions[K], string>] extends [never]
        ? Actions[K]
        : Extract<Actions[K], string> extends "" ? never
        : Actions[K]
      : never
  : never
}

export type ClassNamingThis<Source extends CssModule> = ClassNamingContext<Source> & {
  [stackedKey]: string|undefined
}

type ClassNamingContext<T extends CssModule> = Partial<ClassNamed & {
  classnames: T
}>

type BoolDict = Record<string, boolean>

type Bool<A extends Action> = A extends ClassHash ? true : A

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
