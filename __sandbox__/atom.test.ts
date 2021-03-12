import { Cut, Strip, UnionToIntersection } from "src/ts-swiss.types"

it("stripper", () => {
  type C1 = `${"visible-print"}-${"inline"|"block"|"inline-block"}`|`col${""|"-y"|"-x"}`|"display"
  type Pairs<classes extends string> = {
    [root in Strip<classes, "-">]: {
        [m1 in Merge<root, `${root}-${Strip<Cut<classes, `${root}-`, true>, "-">}`>]: true
      }
    }

  type Merge<Base extends string, Result extends string> = [Result] extends [never] ? Base : [UnionToIntersection<Result>] extends [never] ? Base : Result

  const checks: Record<string, Pairs<C1>> = {
    "x": {
      visible: {"visible-print": true},
      col: {col: true},
      display: {display: true}
    }
  }

  expect(checks).toBeInstanceOf(Object)
})