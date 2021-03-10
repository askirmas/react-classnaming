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
  Q1 extends undefined | boolean | BemQuery<keyof ClassNames>,
  Q2 extends BemQuery<keyof ClassNames>,
>(
  arg0?: Q1,
  arg1?: Q1 extends undefined | boolean ? Q2 : never
) => ClassNamed

export type BemQuery<
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
          ? MV extends `${infer M}${delM}${infer _}` ? M : MV
          : never
        ]?: classes extends `${b}${delM}${m}${delM}${infer V}`
        ? false|V
        : boolean
      }
    } & {
    [e in BE extends `${b}${delE}${infer E}` ? E : never]?: boolean | {
      [
        m in classes extends `${b}${delE}${e}${delM}${infer M}${delM}${infer _}`
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
