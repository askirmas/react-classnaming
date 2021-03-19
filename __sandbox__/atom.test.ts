/// <reference path="../src/global.d.ts" />
import type {CssIdentifiersMap as BootStrap4} from "../__typing__/bootstrap4.css"
import type { After, Cut, Ever0, Strip, UnionToIntersection } from "../src/ts-swiss.types"
import type { CssModule } from "definitions.types"

type MergeProps<Base extends string, Result extends string> = [Result] extends [never] ? Base : [UnionToIntersection<Result>] extends [never] ? Base : Result

type RootProps<
  classes extends string,
  delimiter extends string
> = {
  [root in Strip<classes, delimiter>]: MergeProps<root, `${root}${delimiter}${Strip<Cut<classes, `${root}${delimiter}`, true>, delimiter>}`>
}[Strip<classes, delimiter>]

type MiddleProps<
  classes extends string,
  delimiter extends string
> = {
  [root in Strip<classes, delimiter, true>]: Exclude<classes extends `${string}${delimiter}${root}` ? never : root, classes>
}[Strip<classes, delimiter, true>]

type ValuesQ<
  classes extends string,
  props extends string,
  values extends boolean|string|number,
  delimiter extends string,
  selfKey extends string
> = (
  false
  | values
  | {[p in props|selfKey]?: p extends selfKey ? values : After<classes, `${p}${delimiter}`>}
  | [
    values,
    {[p in props]?: After<classes, `${p}${delimiter}`>}
  ]
)

type Values<
  classes extends string,
  delimiter extends string,
  selfKey extends string
> = ValuesQ<
  classes,
  MiddleProps<classes, delimiter>,
  Ever0<ReactClassNaming.ParseInt<Cut<classes, `${MiddleProps<classes, delimiter>}${delimiter}`>>, true>,
  delimiter,
  selfKey
>

type AtomicQuery<
  css extends CssModule,
  delimiter extends string = "delimiter" extends keyof ReactClassNaming.AtomOptions
  ? ReactClassNaming.AtomOptions["delimiter"]
  : ReactClassNaming.AtomOptions["$default"]["delimiter"],
  selfKey extends string = "selfKey" extends keyof ReactClassNaming.AtomOptions
  ? ReactClassNaming.AtomOptions["selfKey"]
  : ReactClassNaming.AtomOptions["$default"]["selfKey"]
> = {
  //TODO #38 Make good values hint here and without delimiter and selfkey
  [p in RootProps<keyof css, delimiter>]?: Values<After<keyof css, `${p}${delimiter}`>, delimiter, selfKey>
}

it("atomic bootstrap4", () => {
  const check: Record<string, AtomicQuery<BootStrap4>> = {
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
  const check: Record<string, Values<Display, "-", "_">> = {
    "1": ["block", {lg: "block"}]
  }
  expect(check).toBeInstanceOf(Object)
})
