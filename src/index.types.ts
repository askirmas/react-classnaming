import type {
  CssModule,
  ClassNamed,
  ClassHash,
  ClassNamesProperty,
  ActionsOf,
  Action,
  Act4Used
} from "./defs"
import {
  BoolDict,
  RequiredKeys,
  AnyObject,
  Falsy,
  Ever
} from "./ts-swiss";

// Making as interface breaks stuff
export type ClassNamingFn<Source extends CssModule, Used extends BoolDict, WithClassName extends boolean> =
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
  // Change to `ActionsOf` breaks TS
  Actions0 extends {[K in keyof Source]?: Action},
  Actions1 extends {[K in keyof Source]?: Action},
  ApplyClassName extends WithClassName|false = false
 >(
  arg0?: ApplyClassName | Falsy | StrictSub<Used, Source, Actions0>,
  arg1?: ApplyClassName extends true ? Falsy | StrictSub<Used, Source, Actions1> : never
) => ClassNaming<
  ApplyClassName extends true ? false : WithClassName,
  {[K in keyof Used | RequiredKeys<Actions0 | Actions1>]: K extends keyof Used ? Used[K] : Act4Used<Actions0[K]>},
  Source
>;

export type ClassNaming<WithClassName extends boolean, Used extends BoolDict, Source extends CssModule>
= ClassNamingFn<
  {[K in Exclude<keyof Source, RequiredKeys<Used> >]: Source[K]},
  Used,
  WithClassName
> & ClassNamed

type StrictSub<Used extends BoolDict, Source extends CssModule, Actions extends ActionsOf<Source>>
= Extract<Actions, AnyObject> & {
  [K in keyof Actions]: K extends keyof Source
  ? K extends keyof Used ? never
  : Actions[K] extends boolean
    ? Actions[K]
    : Actions[K] extends ClassHash
      ? Ever<
        Extract<Actions[K], string>,
        Extract<Actions[K], string> extends "" ? never : Actions[K],
        Actions[K]
      >
      : never
  : never
}

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
      ActionsOf<Source>
  }) => {classnames: {[T in keyof Target["classnames"]]: string}}
);
