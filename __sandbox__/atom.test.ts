/// <reference path="../src/global.d.ts" />
import type {CssIdentifiersMap as BootStrap4} from "../__typing__/bootstrap4.css"
import type { Cut, Ever0, Strip, UnionToIntersection } from "../src/ts-swiss.types"

type After<Str extends string, Start extends string> = Str extends `${Start}${infer End}` ? End : never
type StrToInt<K extends string> = K extends keyof ReactClassNaming.StrToNum ? ReactClassNaming.StrToNum[K] : K
type Merge<Base extends string, Result extends string> = [Result] extends [never] ? Base : [UnionToIntersection<Result>] extends [never] ? Base : Result

type RootProps<classes extends string> = {
  [root in Strip<classes, "-">]: Merge<root, `${root}-${Strip<Cut<classes, `${root}-`, true>, "-">}`>
}[Strip<classes, "-">]

type MiddleProps<classes extends string> = {
  [root in Strip<classes, "-", true>]: Exclude<classes extends `${string}-${root}` ? never : root, classes>
}[Strip<classes, "-", true>]

type ValuesQ<classes extends string, props extends string, values extends boolean|string> = (
  false
  | values
  | {[p in props|"_"]?: p extends "_" ? values : After<classes, `${p}-`>}
  | [
    values,
    {[p in props]?: After<classes, `${p}-`>}
  ]
)

type Values<classes extends string> = ValuesQ<
  classes,
  MiddleProps<classes>,
  Ever0<StrToInt<Cut<classes, `${MiddleProps<classes>}-`>>, true>
>

type AtomicQuery<classes extends string> = {
  //TODO #38 Make good values hint here
  [p in RootProps<classes>]?: Values<After<classes, `${p}-`>>
}

it("atomic bootstrap", () => {
  const check: Record<string, AtomicQuery<keyof BootStrap4>> = {
    "1": {
      collapse: true,
      display: 1,
      "progress-bar": "animated",
      "justify-content": {
        _: "around",
        "lg": "between"
      },
      d: ["inline", {lg: "inline-block"}]
    },
  }
  expect(check).toBeInstanceOf(Object)
})

it("merge values",() => {
  type Display = `${""|"lg-"|"md-"}${
    "none"
    |`table${""|"-row"|"-cell"}`
    |"inline"
    |`${"inline-"|""}${"block"|"flex"}`
  }`
  const check: Record<string, Values<Display>> = {
    "1": ["block", {lg: "block"}]
  }
  expect(check).toBeInstanceOf(Object)
})
