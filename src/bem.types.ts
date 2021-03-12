import type { CssModule } from "./definitions.types"
import type {
  Strip,
  Cut,
  NoSubString,
  PartDeep,
  Extends,
  KeyOf,
  Ever
} from "./ts-swiss.types"
import type { ClassNamed } from "./main.types"

export type ClassBeming<
  ClassNames extends CssModule,
> = 
/**
 * Makes `string`-className from conditioned BEM query based on supplied CSS classes. 
 * Destructed to singleton `{className: string}`, stringifyable object
 * @returns
 * @example
 * ```typescript
 *    bem(true) // `${props.className}`
 *    bem({button: true}) // "button"
 *    bem({button: "raised"}) // "button button--raised"
 *    bem({button: false && "raised"}) // "button"
 *    bem({button: {type: "raised"}}) // "button button--type--raised"
 * 
 *    bem(true, {
 *      "material-icons": undefined,
 *      ripple: "background-focused",
 *      button__icon: {size: "big"}
 *    }) // `${props.className} material-icons ripple ripple--background-focused button__icon button__icon--size--big`
 * ```
 * @example
 * ```typescript
 *   <div {...bem(...)} />;
 *   <div data-block={`${bem(...)}`} />
 * ```
*/
<
  Q1 extends boolean// | BemQuery<keyof ClassNames>,
  // Q2 extends BemQuery<keyof ClassNames> will be needed for #31
>(
  arg0?: Q1 extends true ? Q1 : BemQuery<keyof ClassNames>, 
  arg1?: Q1 extends undefined | boolean ? BemQuery<keyof ClassNames> : never
) => ClassNamed

export type BemQuery<
  classes extends string,
  delE extends string = "elementDelimiter" extends keyof ReactClassNaming.BemOptions
  ? ReactClassNaming.BemOptions["elementDelimiter"]
  : ReactClassNaming.BemOptions["$default"]["elementDelimiter"],
  delM extends string = "modDelimiter" extends keyof ReactClassNaming.BemOptions
  ? ReactClassNaming.BemOptions["modDelimiter"]
  : ReactClassNaming.BemOptions["$default"]["modDelimiter"],
> = string extends classes ? BemInGeneral : PartDeep<{
  [base in Strip<classes, delM> | Strip<Strip<classes, delM>, delE>]: true
  | (
    Extends<classes, `${base}${delM}${string}`, 
      Mods<
        NoSubString<Cut<classes, `${base}${delM}`, true>, delM>,
        {
          [m in Strip<Cut<classes, `${base}${delM}`, true>, delM, true>]:
            classes extends `${base}${delM}${m}${delM}${infer V}`
            ? V
            : never
        }
      >
    >
  )
}>

export type Mods<Bools extends string, Enums extends Record<string, string>>
= false
//TODO #42 [false|Bools|Enum, ...Bools]
| Ever<Bools, Bools|(false | Bools)[], never>
| {[m in Bools | KeyOf<Enums>]?:
  false
  | (m extends Bools ? true : never)
  | (m extends KeyOf<Enums> ? Enums[m] : never)
}

export type BemInGeneral = {
  [base: string]: undefined | boolean | string
  | (false|string)[]
  | {
    [mod: string]: undefined | boolean | string
  }
}
