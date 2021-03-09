import React from "react"
import expectRender from "../expect-to-same-render"
import { classNamesCheck } from "react-classnaming"
import App from "./App"

// Emulation of import some_module_css from "./some.module.css"
const some_module_css = {
  "app__container": "hash-app__container",
  "app__item": "hash-app__item",
  "btn": "hash-btn",
  "icon": "hash-icon",
  "btn__icon": "hash-btn__icon"
} 

it("render App with css-module", () => expectRender(

  /// index.tsx
  <App className="theme--dark" classnames={classNamesCheck(some_module_css)} />
  
).toSame(<>
  { "/// App.tsx" }
  <div className="theme--dark hash-app__container">

    { "/// MyComponent.tsx" }
    <button className="hash-btn">
      <i className="hash-btn__icon hash-icon"/>
    </button>

    { "/// node_modules/third_party_component" }
    <div className="hash-app__item">
      <div className="third-item">third-item</div>
    </div>
  </div>
</>))

it("render App with global css", () => expectRender(
  /// index.tsx
  <App className="theme--dark" classnames={classNamesCheck()} />
).toSame(<>
  { "/// App.tsx" }
  <div className="theme--dark app__container">

    { "/// MyComponent.tsx" }
    <button className="btn">
      <i className="btn__icon icon"/>
    </button>

    { "/// node_modules/third_party_component" }
    <div className="app__item">
      <div className="third-item">third-item</div>
    </div>
  </div>
</>))
  
