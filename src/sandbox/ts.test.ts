export {}

it("`in string` vs `:string`", () => {
  type In = {[k in string]: boolean}
  type Colon = {[k: string]: boolean}
  
  function check1(_: {some: boolean}) {}
  function checkR<K extends string>(_: {[k in K]: boolean}) {}
  function checkC(_: {[k: string]: boolean}) {}

  const input1: In = {}, input2: Colon = {}
  //@ts-expect-error
  check1(input1)
  //@ts-expect-error
  check1(input2)
  checkR(input1)
  checkR(input2)
  checkC(input1)
  checkC(input2)

}) 