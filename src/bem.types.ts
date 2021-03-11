import type { CssModule } from "./definitions.types"
import type {
  Subest,
  Strip,
  PartDeep,
  // PartDeep
} from "./ts-swiss.types"
import type { ClassNamed } from "./main.types"
import type {ReactClassNaming} from "."

export type ClassBeming<
  ClassNames extends CssModule,
> = 
<
  Q1 extends undefined | boolean | BemQuery<keyof ClassNames>,
  // Q2 extends BemQuery<keyof ClassNames>,
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
> = string extends classes ? BemAbsraction : PartDeep<{
  [b in Strip<Strip<classes, delM>, delE>]: boolean | (
    Extends<classes, `${b}${delE | delM}${string}`, 
      {
        [e in Elements<classes, b>]: boolean
        | (MVs<classes, b, e> extends `${string}${delM}${string}` ? never : MVs<classes, b, e>)
        | (
          {[m in Strip<MVs<classes, b, e>, delM>]: 
            classes extends `${b}${
              e extends bModKey ? "" : `${delE}${e}`
            }${delM}${m}${delM}${infer V}`
            ? false | V
            : boolean
          }
        )
      }
    >
    // : never
  )
}>

type Extends<T, V, X> = [T extends V ? true : never] extends [never] ? never : X

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

// type ModValObject<
//   MV extends string | never,
//   delM extends string = "modDelimiter" extends keyof ReactClassNaming.BemOptions
//   ? ReactClassNaming.BemOptions["modDelimiter"]
//   : ReactClassNaming.BemOptions["$default"]["modDelimiter"],
// > = MV extends never ? never : (MV extends `${string}${delM}${string}` ? never : MV)
// | {
//   [m in Strip<MV, delM>]?:
//     MV extends `${m}${delM}${infer V}`
//     ? (false | V)
//     : boolean
// }


export type BemAbsraction = {
  [block: string]: undefined | boolean | string | {
    [el: string]: undefined | boolean | string | {
      [mod: string]: undefined | boolean | string
    }
  }
}
