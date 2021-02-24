import classNamingBasic from "./basic"
import classNamesCheck from "./check"

it("TBD no duplication on TS level", () => {
  const {class1, class2} = classNamesCheck()
  expect({
    ...classNamingBasic({class1})({class2})({
      //TODO //@ts-expect-error
      class1
    })
  }).toStrictEqual({
      className: "class1 class2 class1"
    })
})