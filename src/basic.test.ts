import classNamingBasic from "./basic"
import classNamesCheck from "./check"

it("TBD no duplication on TS level", () => {
  const {class1, class2} = classNamesCheck()
  , call1 = classNamingBasic({class1})
  , call2 = call1({class2})
  //TODO //@ts-expect-error
  , call3 = call2({class1})

  expect({
    ...call3
  }).toStrictEqual({
    className: "class1 class2 class1"
  })
})