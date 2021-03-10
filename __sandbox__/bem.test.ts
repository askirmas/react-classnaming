import { Primitive } from "react-classnaming/ts-swiss.defs"
import { CssModule } from "../src/definitions.defs"

it("tree2classes", () => {

  type BemTree = {
    [block: string]: {
        // ""?: {[blockMod: string]: true}
        [element: string]: boolean | {[elMod: string]: boolean} 
    }
  }
  
  type El2Classes<DMod extends string, S extends Record<string, boolean|Record<string, boolean>>> = {[K in string & keyof S]:
    K | (S[K] extends Record<string, boolean> ? `${K}${DMod}${string & keyof S[K]}` : never)
  }[string & keyof S]
  
  type BemTree2Classes<DEl extends string, DMod extends string, S extends BemTree> = {[K in string & keyof S]:
    K | `${K}${DEl}${El2Classes<DMod,S[K]>}`
  }[string & keyof S]
 
 
  const bem2 = {
    "Button": {
       "Container": true,
       "Icon": {
           "small": true,
           "big": true
       }
   },
   "Form": {
       "Container": true,
       "Button": true
   }   
  }
  
  const suite: Record<BemTree2Classes<"__", "--", typeof bem2>, boolean> = {
    Button: true,
    Button__Icon: true,
    "Button__Icon--big": true,
    "Button__Icon--small": true,
    Button__Container: true,
    Form: true,
    Form__Button: true,
    Form__Container: true
   }

  expect(suite).toBeInstanceOf(Object)     
})

type ClassNames = {
  "App": string
  "App--dark": string
  "App__Container": string
  "App__Container--loading": string
  "App__Container--status--loading": string
  "App__Container--status--error": string
  "App__Header": string
  "Btn": string
  "Btn--disabled": string
  "Btn--info--warning": string
  "Btn--info--error": string
  "Btn__Icon": string
  "Btn__Icon--big": string
  "Footer": string
}

it("take blocks", () => {
  // type digits = '0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'
  type smallLetters = 'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h'|'i'|'j'|'k'|'l'|'m'|'n'|'o'|'p'|'q'|'r'|'s'|'t'|'u'|'v'|'w'|'x'|'y'|'z'
  type bigLetters = 'A'|'B'|'C'|'D'|'E'|'F'|'G'|'H'|'I'|'J'|'K'|'L'|'M'|'N'|'O'|'P'|'Q'|'R'|'S'|'T'|'U'|'V'|'W'|'X'|'Y'|'Z'
  type letters = smallLetters | bigLetters

  type FirstWord<chars extends string, word extends string, stacked extends string = ""> = word extends `${chars}${infer K}`
  ? word extends `${infer F}${K}`
  ? FirstWord<chars, K, `${stacked}${F}`>
  : never
  : stacked

  type Blocks<T> = {[K in keyof T]: FirstWord<letters, K & string>}[keyof T]

  const suite: Record<Blocks<ClassNames>, Blocks<ClassNames>> = {
    App: "App",
    Btn: "Btn",
    Footer: "Footer"
  }

  expect(suite).toBeInstanceOf(Object)
})

describe("upon delimiter", () => {
  type Strip<Str extends string, Delimiter extends string> = Str extends `${infer Lead}${Delimiter}${string}` ? Lead : Str
  type StripFromObj<T, Delimiter extends string> = {[K in string & keyof T]: Strip<K,Delimiter>}[keyof T]
  type GetMods<T, B extends string, E extends string|undefined> = {
    [K in string & keyof T]: E extends string 
    ? K extends `${B}__${E}--${infer M}` ? M : never
    : K extends `${B}--${infer M}` ? M : never
  }[keyof T]

  it("args", () => {
    type Bemer<ClassNames extends CssModule> = (
      <
        BE extends StripFromObj<ClassNames, "--">,
        Block extends Strip<BE, "__">,
        Element extends undefined|(BE extends `${Block}__${infer Element}` ? Element : undefined) = undefined,
        Modifier extends undefined|GetMods<ClassNames, Block, Element> = undefined
      >(
        block: Block,
        element?: Element,
        modifier?: Modifier
      ) => `${
        Block
      }${
        Element extends string ? ` ${Block}__${Element}` : ""
      }${
        Modifier extends string 
        ? ` ${Block}${
          Element extends string ? `__${Element}` : ""
        }--${Modifier}`
        : ""
      }`
    )
  
  
    function beming<ClassNames extends CssModule>() {
      const host: Bemer<ClassNames> = ((block, element?, modifier?) => {
        const elemened = element ? `${block}__${element}` : ""
        const moded = modifier ? ` ${element ? elemened : block}--${modifier}` : ""
    
        return `${
          block
        }${
          element ! ? " " : ""
        }${
          elemened
        }${
          moded
        }`
      }) as Bemer<ClassNames>
  
      return host
    }
      
  
    const bemer = beming<ClassNames>()
    , $return = bemer("Btn", "Icon", "big")
    , typed: typeof $return = "Btn Btn__Icon Btn__Icon--big"
  
    expect($return).toBe(typed)
  })
  
  it("query", () => {
    type BemQuery<ClassNames extends CssModule, delE extends string = "__", delM extends string = "--"> = 
    <
      classes extends keyof ClassNames,
      BE extends StripFromObj<ClassNames, delM>,
      Block extends Strip<BE, delE>,
      Q extends {
        [b in Block]?: boolean | (
          {
            // ""?: classes extends `${b}--${infer _}`
            // ? {
            //   [m in classes extends `${b}--${infer M}--${infer _}`
            //     ? M 
            //     : classes extends `${b}--${infer M}`
            //     ? M
            //     : never
            //   ]?: classes extends `${b}--${m}--${infer V}`
            //     ? false|V
            //     : boolean
            // }
            // : never
              // {
              //   [m in MV extends `${infer M}--${infer _}` ? M : MV]: 
              //     MV extends `${m}--${infer V}`
              //     ? false|V
              //     : boolean
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
    >(arg: Q) => {[K in 
      keyof Q
      | {[b in keyof Q]: Q[b] extends Primitive ? never : `${b}${delE}${keyof Q[b]}`}[keyof Q]
      | {
        [b in keyof Q]: {[e in keyof Q[b]]: Q[b][e] extends Primitive ? never :
          {[m in keyof Q[b][e]]: 
            Q[b][e][m] extends string
            ? `${b}${delE}${e}${delM}${m}${delM}${Q[b][e][m]}`
            : `${b}${delE}${e}${delM}${m}`
          }[keyof Q[b][e]]
        }[keyof Q[b]]
      }[keyof Q]
    ]: boolean}

    //@ts-expect-error
    const q: BemQuery<ClassNames> = x => {
      const $result: Record<string, undefined|boolean> = {}

      for (const block in x) {
        const bVal = x[block]
        if (!bVal) {
          //@ts-expect-error
          $result[block] = bVal
          continue
        }
        
        $result[block] = true

        for (const el in bVal) {
          //@ts-expect-error
          const eVal = bVal[el]
          , be = `${block}__${el}`
          if (!eVal) {
            $result[be] = eVal
            continue
          }

          $result[be] = true

          for (const mod in eVal) {
            const value: string|boolean = eVal[mod]
            switch (typeof value) {
              case "boolean": 
                $result[`${be}--${mod}`] = value
                break 
              case "string":
                $result[`${be}--${mod}--${value}`] = true
                break
            }
          }
        }
      }

      return $result
    }
    , res = q({
      "App": {
        "Header": false,
        "Container": {
          "loading": true,
          "status": "error"
        }
      },
      "Btn": {
        "Icon": {
          "big": true
        }
      },
      "Footer": false
    })

    expect(res).toStrictEqual({
      "App": true,
      "App__Container": true,
      "App__Container--loading": true,
      "App__Container--status--error": true,
      "App__Header": false,
      "Btn": true,
      "Btn__Icon": true,
      "Btn__Icon--big": true,
      "Footer": false,
    } as typeof res)
  })
})
