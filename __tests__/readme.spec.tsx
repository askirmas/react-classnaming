import React from "react"
import expectRender from "../expect-to-same-render"
import classNaming from "../src"
import type {ClassHash, ClassNamesProperty} from "../src"

it("Basic usage", () => {
  type Props = {
    isValid: boolean
    readOnly: boolean
  }

  // isValid = false, readOnly = false
  function FormButtons({isValid, readOnly}: Props) {
    const cssClasses = classNaming()
    const buttonClass = cssClasses({"button": true}) // "button"
    
    return <>
      <button {
        ...buttonClass // className="button" 
      }>Close</button>
      <button type="reset" {
        ...buttonClass({"button--disabled": readOnly}) // className="button"
      }>Reset</button> 
      <button type="submit" className={`button_submit ${
        buttonClass({"button--disabled": readOnly || !isValid}) // "button button--disabled"
      }`}>Submit</button> 
    </>
  }  

  expectRender(
    <FormButtons isValid={false} readOnly={false} />
  ).toSame(<>
    <button className="button">Close</button>
    <button type="reset" className="button">Reset</button>
    <button type="submit" className="button_submit button button--disabled">Submit</button>
  </>)
})

it("Strict type", () => {
  type Props = {readOnly?: boolean}
  const {readOnly} = {} as Props
  const cssClasses = classNaming()
  const disabling = cssClasses({
    //@ts-expect-error Type 'boolean | undefined' is not assignable to type 'boolean'
    "button--disabled": readOnly
  })

  expect({...disabling}).toStrictEqual({className: "button--disabled"})
})

it("Single source of truth", () => {
  const cssClasses = classNaming()
  const isValidClass = cssClasses({"button--disabled": /* !isValid */ false })
  // ... more code
  const buttonClass = isValidClass({button: true})
  // ... more code
  const disablingClass = buttonClass({
    //@ts-expect-error Type 'boolean' is not assignable to type 'never'
    "button--disabled": true
  })
  
  expect({...disablingClass}).toStrictEqual({
    className: "button button--disabled"
  })
})

it("Declare own component's CSS classes", () => {
  type MyClassNames = ClassNamesProperty<{
    button: ClassHash
    button_submit: ClassHash
    "button--disabled": ClassHash
  }>
  type Props = {
    isValid: boolean
    readOnly: boolean
  }

  // isValid = false, readOnly = false
  function FormButtons({isValid, readOnly}: Props) {
    const cssClasses = classNaming<MyClassNames>()
    const buttonClass = cssClasses({button: true})
    
    return <>
      <button {
        ...buttonClass // className="button" 
      }>Close</button>
      <button type="reset" {
        ...buttonClass({"button--disabled": readOnly}) // className="button"
      }>Reset</button> 
      <button type="submit" className={`button_submit ${
        buttonClass({"button--disabled": readOnly || !isValid}) // "button button--disabled"
      }`}>Submit</button> 
    </>
  }  

  expectRender(
    <FormButtons isValid={false} readOnly={false} />
  ).toSame(<>
    <button className="button">Close</button>
    <button type="reset" className="button">Reset</button>
    <button type="submit" className="button_submit button button--disabled">Submit</button>
  </>)
})
