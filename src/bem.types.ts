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
  Q1 extends undefined | boolean | BemQuery2<keyof ClassNames>,
  Q2 extends BemQuery2<keyof ClassNames>,
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
> = string extends classes ? BemAbsraction : {
  [b in Block]?: boolean | (
    classes extends `${b}${delE | delM}${string}`
    ? {
      [e in (
        classes extends `${b}${delE}${infer E}`
        ? Strip<E, delM>
        : classes extends `${b}${delM}${string}`
        ? bModKey
        : never
      )]?: boolean
      | (
        classes extends `${b}${
          e extends bModKey ? "" : `${delE}${e}`
        }${delM}${infer MV}`
        ? (
          (MV extends `${string}${delM}${string}` ? never : MV)
          | {
            [m in Strip<MV, delM>]?:
              MV extends `${m}${delM}${infer V}`
              //TODO why `[]` is hack to make things work?
              ? false | V | []
              : boolean
          }
        )
        : never
      )
    }
    : never
  )
}

export type BemAbsraction = {
  [block: string]: undefined | boolean | string | {
    [el: string]: undefined | boolean | string | {
      [mod: string]: undefined | boolean | string
    }
  }
}
