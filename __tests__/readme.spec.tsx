import React from "react"
import expectRender from "../expect-to-same-render"
import classNaming from "../src"

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
