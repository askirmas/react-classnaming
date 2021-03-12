import React from "react"
import expectRender from "../expect-to-same-render"
import classNaming, { classBeming, ClassNamed, Undefineds } from "../src"
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

it("bem leaf", () => {
  type Props = ClassNamesProperty<MaterialClasses>
  & { focused?: boolean }

  function DialogButton({focused}: Props) {
    const bem = classBeming<Props>()
  
    return <button {...bem({
      dialog__button: true,
      button: {type: "raised"},
      ripple: focused && "background-focused"
    })}/>
  }

  
  const props = {focused: true} as Props

  expectRender(
    <DialogButton {...props}/>
  ).toSame(
    <button className="dialog__button button button--type--raised ripple ripple--background-focused" />
  )
})

describe("bem from https://material.io/components/buttons/web#contained-button", () => {
  const CONSTS = {ripple: "ripple-upgraded", icon: {"material-icons": true}} as const

  type Props = ClassNamed & ClassNamesProperty<MaterialClasses>
  & { focused?: boolean; clicking?: boolean }

  const {ripple, icon} = CONSTS
  const {
    button__icon,
    button__label,
    button__ripple
  } = {} as Undefineds<MaterialClasses>

  function Button(props: Props) {
    const {
      clicking,
      focused = false,
    } = props

    const bem = classBeming(props)

    return <button {...bem(true, {
      button: "raised",
      [ripple]: [
        "unbounded",
        focused && "background-focused",
        clicking ? "foreground-activation" : clicking === false && "foreground-deactivation"
      ]
    })}>
      <span  {...bem({button__ripple})}/>
      <i  {...bem({button__icon, ...icon})}>bookmark</i>
      <span  {...bem({button__label})}>Contained Button plus Icon</span>
    </button>
  }

  expectRender(
    <Button className="dialog__button" clicking={false} focused={true} classnames={{} as MaterialClasses}/>
  ).toSame(
    <button className="dialog__button button button--raised ripple-upgraded ripple-upgraded--unbounded ripple-upgraded--background-focused ripple-upgraded--foreground-deactivation">
      <span className="button__ripple"/>
      <i className="button__icon material-icons">bookmark</i>
      <span className="button__label">Contained Button plus Icon</span>
    </button>
  )
})

type MaterialClasses = {
  "material-icons": ClassHash
  ripple: ClassHash
  "ripple--bounded": ClassHash
  "ripple--unbounded": ClassHash
  "ripple--background-focused": ClassHash
  "ripple--foreground-activation": ClassHash
  "ripple--foreground-deactivation": ClassHash
  
  "ripple-upgraded": ClassHash
  "ripple-upgraded--bounded": ClassHash
  "ripple-upgraded--unbounded": ClassHash
  "ripple-upgraded--background-focused": ClassHash
  "ripple-upgraded--foreground-activation": ClassHash
  "ripple-upgraded--foreground-deactivation": ClassHash
    
  button: ClassHash
  "button--raised": ClassHash
  "button--type--raised": ClassHash
  "button--type--outlined": ClassHash
  button__label: ClassHash
  button__ripple: ClassHash
  button__icon: ClassHash

  dialog: ClassHash
  dialog__button: ClassHash
}
