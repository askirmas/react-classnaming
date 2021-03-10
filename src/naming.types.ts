import type {
  ClassNamed,
  ClassHash,
} from "./main.types"
import type {
  CssModule,
  ActionsOf,
  Action,
  Act4Used
} from "./definitions.types"
import type {
  GetProps
} from "./react-swiss.types";
import type {
  BoolDict,
  RequiredKeys,
  AnyObject,
  Falsy,
  Ever,
  OmitIndexed
} from "./ts-swiss.types";

// Making as interface make ts-errors much worth
export type ClassNamingFn<Source extends CssModule, Used extends BoolDict, WithClassName extends boolean> =
/** 
 * Makes `string` from conditioned CSS classes as keys.
 * Destructed to singleton `{className: string}`, stringifyable, re-callable with propagation of previously stacked
 * @example
 * ```typescript
 *   classes({App}); // "App"
 *   classes(true); // `${props.className}`
 *   classes(true && {App: true, "App--bad": false}); // `${props.className} App`
 *   classes(); // `== classes`
 * 
 *   const btn = classes({btn}) // "btn"
 *   btn(true, {"btn--disabled": true}); // `${props.className} btn btn--disabled`
 * ```
 * @example
 * ```tsx
 *   <div {...classes} />;
 *   <div {...classes(...)} />; 
 *   <div data-block={`${classes}`} />
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
  ApplyClassName extends WithClassName | false
 >(
  arg0?: ApplyClassName | Falsy | StrictSub<Used, Source, Actions0>,
  arg1?: ApplyClassName extends true ? Falsy | StrictSub<Used, Source, Actions1> : never
) => ClassNaming<
  ApplyClassName extends true ? false : WithClassName,
  {[K in keyof Used | RequiredKeys<Actions0 | Actions1>]: K extends keyof Used
    ? Used[K]
    : Act4Used<Actions0[K]> & Act4Used<Actions1[K]>
  },
  Source
>;

export type ClassNaming<WithClassName extends boolean, Used extends BoolDict, Source extends CssModule>
= ClassNamingFn<
  {[K in Exclude<keyof Source, RequiredKeys<Used> >]: Source[K]},
  Used,
  WithClassName
> & ClassNamed

type StrictSub<Used extends BoolDict, Source extends CssModule, Actions extends ActionsOf<Source>>
= {
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
      : boolean
  : never
}

export type ClassNamesMapping<Source extends CssModule> = (
/** Function to map `classnames` to certain properties of target Component
 * @example 
 * ```tsx
 *  <ThirdPartyComponent {...mapping({} as typeof ThirdPartyComponent, {
 *    ContainerClassName: { Root, "Theme--dark": true },
 *    Checked___true: classes({"Item--active": true}),
 *    Checked___false: {}
 *  })}/>
 *```
 */
  <
    Target extends AnyObject,
    Mapping extends ClassNamesMap<OmitIndexed<GetProps<Target>>, Source>
  >(target: Target, map: StrictActions<Mapping>) => Omit<
    {[M in keyof Mapping]: string},
    {[M in keyof Mapping]: Mapping[M] extends undefined ? M : never}[keyof Mapping]
  >
);

export type ClassNamesMap<TargetProps extends AnyObject, Source extends CssModule>
= Pick<
  {[K in keyof TargetProps]?:
    ClassNaming<boolean, {}, Source>
    | {[S in keyof Source]?:
      //TODO Strict action
      Action
    }
  },
  {[T in keyof TargetProps]: string extends TargetProps[T] ? T : never}[keyof TargetProps]
>

type StrictActions<MapActs extends ClassNamesMap<any, any>> = {
  [T in keyof MapActs]:
    MapActs[T] extends Record<string, Action>
    ? {[S in keyof MapActs[T]]:
      MapActs[T][S] extends boolean
      ? MapActs[T][S]
      : MapActs[T][S] extends ClassHash
        ? Ever<
          Extract<MapActs[T][S], string>,
          Extract<MapActs[T][S], string> extends "" ? never : MapActs[T][S],
          MapActs[T][S]
        >

        : boolean
    }
    : MapActs[T]
}
