// Can be used on #30

import type { Ever0, Extends, PartDeep, Strip } from "src/ts-swiss.types"
import type {ReactClassNaming} from "../src"

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
    [el: string]: undefined | boolean | string
    | {
      [mod: string]: undefined | boolean | string
    }
  }
}
