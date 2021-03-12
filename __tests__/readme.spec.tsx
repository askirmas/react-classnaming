import React from "react"
import expectRender from "../expect-to-same-render"
import classNaming, { classBeming, ClassNamed } from "../src"
import type {ClassHash, ClassNamesProperty} from "../src"
// import css_module from "./button.module.css"
const css_module = {button: "BTN"}

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
                        {/* className="button_submit button button--disabled" */}
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
        ...buttonClass({
        "button--disabled": readOnly
      }) // className="button"
      }>Reset</button> 
      <button type="submit" {
        ...buttonClass({
          "button_submit": true,
          "button--disabled": readOnly || !isValid
        }) // className="button button_submit button--disabled"
      }>Submit</button> 
    </>
  }  

  expectRender(
    <FormButtons isValid={false} readOnly={false} />
  ).toSame(<>
    <button className="button">Close</button>
    <button type="reset" className="button">Reset</button>
    <button type="submit" className="button button_submit button--disabled">Submit</button>
  </>)
})

it("Using ClassHash", () => {
  // CSS-module
  const { button } = css_module

  // Module simulation
  type CssModuleSimulation = { button_submit: ClassHash }
  const { button_submit } = {} as CssModuleSimulation
  
  type MyClassNames = ClassNamesProperty<
    typeof css_module &
    CssModuleSimulation &
    {
      "button--disabled": ClassHash
    }
  >
  type Props = {
    isValid: boolean
    readOnly: boolean
  }

  // isValid = false, readOnly = false
  function FormButtons({isValid, readOnly}: Props) {
    const cssClasses = classNaming<MyClassNames>()
    const buttonClass = cssClasses({ button })
    
    return <>
      <button {
        ...buttonClass // className="BTN" 
      }>Close</button>
      <button type="reset" {
        ...buttonClass({
          "button--disabled": readOnly
      }) // className="BTN"
      }>Reset</button> 
      <button type="submit" {...buttonClass({
        button_submit,
        "button--disabled": readOnly || !isValid
      }) // "BTN button_submit button--disabled"
      }>Submit</button> 
    </>
  }  

  expectRender(
    <FormButtons isValid={false} readOnly={false} />
  ).toSame(<>
    <button className="BTN">Close</button>
    <button type="reset" className="BTN">Reset</button>
    <button type="submit" className="BTN button_submit button--disabled">Submit</button>
  </>)
})

describe("bem", () => {
  type MyClassNames = ClassNamed & ClassNamesProperty<{
    form__item: ClassHash
    button: ClassHash
    "button--status--warning": ClassHash
    "button--status--danger": ClassHash
    button__icon: ClassHash
    "button__icon--hover": ClassHash
    "button__icon--focus": ClassHash
  }>
  const props = {className: "${props.className}"} as MyClassNames

  const bem = classBeming(props)
  expectRender(
    <div {...bem(true, {
      form__item: true,
      button: {status: "danger"},
      button__icon: {hover: true}
    })}/>
  ).not.toSame(
    <div className="${props.className} form__item button button--status--danger button__icon button__icon--hover" />
  )
})
