import { CssModule } from "./definitions.types"
import { Strip } from "./ts-swiss.types"
import { ClassNamed } from "./types"

export type ClassBeming<
  ClassNames extends CssModule,
  // bModKey extends string = "$",
  // delE extends string = "__",
  // delM extends string = "--"
> = 
<
  Q1 extends undefined | boolean | BemQuery1<keyof ClassNames>,
  Q2 extends BemQuery1<keyof ClassNames>,
>(
  arg0?: Q1,
  arg1?: Q1 extends undefined | boolean ? Q2 : never
) => ClassNamed

export type BemQuery1<
  classes extends string,  
  delE extends string = "__",
  delM extends string = "--",
  bModKey extends string = "$",
  BE extends Strip<classes, delM> = Strip<classes, delM>,
  Block extends Strip<BE, delE> = Strip<BE, delE>,
> = {
  [b in Block]?: boolean | (
    {
      [bmKey in bModKey]?: {
        [
          m in classes extends `${b}${delM}${infer MV}`
          ? MV extends `${infer M}${delM}${string}` ? M : MV
          : never
        ]?: classes extends `${b}${delM}${m}${delM}${infer V}`
        ? false|V
        : boolean
      }
    } & {
    [e in BE extends `${b}${delE}${infer E}` ? E : never]?: boolean | {
      [
        m in classes extends `${b}${delE}${e}${delM}${infer M}${delM}${string}`
        ? M
        : classes extends `${b}${delE}${e}${delM}${infer M}`
        ? M
        : never
      ]?: classes extends `${b}${delE}${e}${delM}${m}${delM}${infer V}`
        ? false|V
        : boolean
    }
  })
}    

export type BemQuery2<
  classes extends string,
  delE extends string = "__",
  delM extends string = "--",
  bModKey extends string = "$",
  BE extends Strip<classes, delM> = Strip<classes, delM>,
  Block extends Strip<BE, delE> = Strip<BE, delE>,
> = {
  [b in Block]?: boolean | (
    classes extends `${b}${delE | delM}${string}`
    ? {
      [e in (
        classes extends `${b}${delE}${infer E}`
        ? Strip<E, delM>
        : classes extends `${b}${delM}${string}`
        ? bModKey
        : never
      )]?: e extends bModKey
        ? (
          classes extends `${b}${delM}${infer bMV}`
          ? (
            (
              bMV extends `${infer bM}${delM}${infer bV}`
              ? {[k in bM]?: false | bV}
              : (
                bMV | {[k in bMV]?: boolean}
              )
            )
          )
          : never
        )
        : (
          boolean | (
            classes extends `${b}${delE}${e}${delM}${infer eMV}`
            ? (
              (
                eMV extends `${infer eM}${delM}${infer eV}`
                ? {[k in eM]?: false | eV}
                : (
                  eMV | {[k in eMV]?: boolean}
                )
              )
              // (
              //   eMV extends `${string}${delM}${string}`
              //   ? never 
              //   : eMV
              // ) | {
              //   [eM in Strip<eMV, delM>]?: false | (
              //     eMV extends `${eM}${delM}${infer eV}` ? eV : true
              //   )
              // }
            )
            : never
          )
        )
    }
    : never
  )
}