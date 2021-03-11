import type { CssModule } from "./definitions.types"
import type {
  Subest,
  Strip,
  PartDeep,
  Extends,
  Ever0
} from "./ts-swiss.types"
import type { ClassNamed } from "./main.types"
import type {ReactClassNaming} from "."

export type ClassBeming<
  ClassNames extends CssModule,
> = 
/**
 * Makes `string`-className from conditioned BEM query based on supplied CSS classes. 
 * Destructed to singleton `{className: string}`, stringifyable object
 * @returns
 * ```typescript
 * // ""
 * {block: false}
 * {block: {el: false}}
 * // "block"
 * {block: true}
 * {block: {$: boolean | {} | {[mod]: false} }}
 * // "block__el"
 * {block: {el: true | {} | {[mod]: false} }} 
 * // "block block--mod"
 * {block: "mod"}
 * {block: {$: "mod" | {mod: true} }}
 * // "block__el block__el--mod"
 * {block: {el: "mod" | {mod: true} }} 
 * // "block block--mod--val"
 * {block: {$: {mod: "val"}}} 
 * // "block__el block__el--mod--val"
 * {block: {el: {mod: "val"}}} 
 * ```
 * @example
 * ```typescript
 *    bem(true) // `${props.className}`
 *    bem({button: true}) // "button"
 *    bem({button: {icon: true}}) // "button__icon"
 *    bem({button: "disabled"}) // "button button--disabled"
 *    bem({button: {icon: {size: "big"}}}) // "button__icon button__icon--size--big"
 *    bem(true, {
 *      form: {item: true},
 *      button: {
 *        $: {status: "danger"},
 *        icon: "hover"
 *      }
 *    }) // `${props.className} form__item button button--status--danger button__icon button__icon--hover`
 * ```
 * @example
 * ```typescript
 *   <div {...bem(...)} />;
 *   <div data-block={`${bem(...)}`} />
 * ```
*/
<
  Q1 extends undefined | boolean | BemQuery<keyof ClassNames>,
  // Q2 extends BemQuery<keyof ClassNames> will be needed for #31
>(
  arg0?: Q1 extends undefined | boolean ? Q1 : Subest<BemQuery<keyof ClassNames>, Q1> , 
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
  bModKey extends string = "blockModKey" extends keyof ReactClassNaming.BemOptions
  ? ReactClassNaming.BemOptions["blockModKey"]
  : ReactClassNaming.BemOptions["$default"]["blockModKey"],
> = string extends classes ? BemInGeneral : PartDeep<{
  [b in Strip<Strip<classes, delM>, delE>]: boolean
  | Exclude<MVs<classes, b, bModKey>, `${string}${delM}${string}`>
  | (
    Extends<classes, `${b}${delE | delM}${string}`, 
      {
        [e in Elements<classes, b>]: boolean
        | Exclude<MVs<classes, b, e>, `${string}${delM}${string}`>
        | (
          {[m in Strip<MVs<classes, b, e>, delM>]: 
            false | (
              Ever0<
                classes extends `${b}${
                  e extends bModKey ? "" : `${delE}${e}`
                }${delM}${m}${delM}${infer V}`
                ? V : never,
                true
              >
            )
          }
        )
      }
    >
  )
}>

type Elements<
  classes extends string,
  b extends string,
  delE extends string = "elementDelimiter" extends keyof ReactClassNaming.BemOptions
  ? ReactClassNaming.BemOptions["elementDelimiter"]
  : ReactClassNaming.BemOptions["$default"]["elementDelimiter"],
  delM extends string = "modDelimiter" extends keyof ReactClassNaming.BemOptions
  ? ReactClassNaming.BemOptions["modDelimiter"]
  : ReactClassNaming.BemOptions["$default"]["modDelimiter"],
  bModKey extends string = "blockModKey" extends keyof ReactClassNaming.BemOptions
  ? ReactClassNaming.BemOptions["blockModKey"]
  : ReactClassNaming.BemOptions["$default"]["blockModKey"],
> = classes extends `${b}${delE}${infer E}`
? Strip<E, delM>
: classes extends `${b}${delM}${string}`
? bModKey
: never

type MVs<
  classes extends string,
  b extends string,
  e extends string,
  delE extends string = "elementDelimiter" extends keyof ReactClassNaming.BemOptions
  ? ReactClassNaming.BemOptions["elementDelimiter"]
  : ReactClassNaming.BemOptions["$default"]["elementDelimiter"],
  delM extends string = "modDelimiter" extends keyof ReactClassNaming.BemOptions
  ? ReactClassNaming.BemOptions["modDelimiter"]
  : ReactClassNaming.BemOptions["$default"]["modDelimiter"],
  bModKey extends string = "blockModKey" extends keyof ReactClassNaming.BemOptions
  ? ReactClassNaming.BemOptions["blockModKey"]
  : ReactClassNaming.BemOptions["$default"]["blockModKey"],
> = classes extends `${b}${
  e extends bModKey ? "" : `${delE}${e}`
}${delM}${infer MV}` ? MV : never

export type BemInGeneral = {
  [block: string]: undefined | boolean | string | {
    [el: string]: undefined | boolean | string | {
      [mod: string]: undefined | boolean | string
    }
  }
}
