import type { Ever0, Extends, PartDeep } from "../src/ts-swiss.types"
import type { CssModule } from "../src/definitions.types"

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

  it("args", () => {
    type GetMods<T, B extends string, E extends string|undefined> = {
      [K in string & keyof T]: E extends string
      ? K extends `${B}__${E}--${infer M}` ? M : never
      : K extends `${B}--${infer M}` ? M : never
    }[keyof T]
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
    // Can be used on #30

    type Elements<
        classes extends string,
        b extends string,
        delE extends string = "elementDelimiter" extends keyof ReactClassNaming.BemOptions
        ? ReactClassNaming.BemOptions["elementDelimiter"]
        : ReactClassNaming.BemOptions["$default"]["elementDelimiter"],
        delM extends string = "modDelimiter" extends keyof ReactClassNaming.BemOptions
        ? ReactClassNaming.BemOptions["modDelimiter"]
        : ReactClassNaming.BemOptions["$default"]["modDelimiter"],
        bModKey extends string = "$" /*"blockModKey" extends keyof ReactClassNaming.BemOptions
        ? ReactClassNaming.BemOptions["blockModKey"]
        : ReactClassNaming.BemOptions["$default"]["blockModKey"]*/
      > = classes extends `${b}${delE}${infer E}`
      ? Strip<E, delM>
      : classes extends `${b}${delM}${string}`
      ? bModKey
      : never

    type BemQuery<
      classes extends string,
      delE extends string = "elementDelimiter" extends keyof ReactClassNaming.BemOptions
      ? ReactClassNaming.BemOptions["elementDelimiter"]
      : ReactClassNaming.BemOptions["$default"]["elementDelimiter"],
      delM extends string = "modDelimiter" extends keyof ReactClassNaming.BemOptions
      ? ReactClassNaming.BemOptions["modDelimiter"]
      : ReactClassNaming.BemOptions["$default"]["modDelimiter"],
      bModKey extends string = "$" /*"blockModKey" extends keyof ReactClassNaming.BemOptions
      ? ReactClassNaming.BemOptions["blockModKey"]
      : ReactClassNaming.BemOptions["$default"]["blockModKey"]*/
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
      bModKey extends string = "$" /*"blockModKey" extends keyof ReactClassNaming.BemOptions
      ? ReactClassNaming.BemOptions["blockModKey"]
      : ReactClassNaming.BemOptions["$default"]["blockModKey"]*/
    > = classes extends `${b}${
      e extends bModKey ? "" : `${delE}${e}`
    }${delM}${infer MV}` ? MV : never

    type BemInGeneral = {
      [block: string]: undefined | boolean | string | {
        [el: string]: undefined | boolean | string
        | {
          [mod: string]: undefined | boolean | string
        }
      }
    }

    type BemQuerier<
      ClassNames extends CssModule,
      delE extends string = "__",
      delM extends string = "--",
      bModKey extends string = "$",
    > =
    <
      // classes extends keyof ClassNames,
      // BE extends StripFromObj<ClassNames, delM>,
      Q extends BemQuery<
        keyof ClassNames,
        delE,
        delM,
        bModKey
        // BE,
        // Strip<BE, delE>
      >
    >(arg: Q) => {[K in
      {[b in keyof Q]: Q[b] extends boolean ? b : never}[keyof Q]
      // | {[b in keyof Q]: Q[b] extends Primitive ? never : `${b}${delE}${keyof Q[b]}`}[keyof Q]
      // | {
      //   [b in keyof Q]: {[e in keyof Q[b]]: Q[b][e] extends Primitive ? never :
      //     {[m in keyof Q[b][e]]:
      //       Q[b][e][m] extends string
      //       ? `${b}${delE}${e}${delM}${m}${delM}${Q[b][e][m]}`
      //       : `${b}${delE}${e}${delM}${m}`
      //     }[keyof Q[b][e]]
      //   }[keyof Q[b]]
      // }[keyof Q]
      // {[b in keyof Q]:
      //   Q[b] extends boolean ? b : never
      // }[keyof Q]
    ]: boolean}

    //@ts-expect-error
    const q = x => x as unknown as BemQuerier<ClassNames>
    , res = q({
      "App": {
        "Header": false,
        "Container": {
          "loading": true,
          "status": "error"
        }
      },
      "Btn": {
        $: {
          info: "error",
          disabled: false
        },
        "Icon": {
          "big": true
        }
      },
      "Footer": false
    })
    , typeCheck: Record<string, typeof res> = {
      "exact": {
        //@ts-expect-error
        Footer: true,
        Btn: true,
        App: true,
      }
    }

    // expect(res).toStrictEqual({
    //   "App__Container": true,
    //   "App__Container--loading": true,
    //   "App__Container--status--error": true,
    //   "App__Header": false,
    //   "Btn": true,
    //   "Btn--disabled": false,
    //   "Btn--info--error": true,
    //   "Btn__Icon": true,
    //   "Btn__Icon--big": true,
    //   "Footer": false,
    // })
    expect(typeCheck).toBeInstanceOf(Object)
  })
})
