# react-classnaming

Easy applied function to use optionally with [CSS modules](https://github.com/css-modules/css-modules) and do not get lost in CSS classes by powerful TypeScript notation

![keywords](https://img.shields.io/github/package-json/keywords/askirmas/react-classnaming) [![build@ci](https://github.com/askirmas/react-classnaming/workflows/build/badge.svg?branch=main)](https://www.npmjs.com/package/react-classnaming) ![coverage](https://img.shields.io/codecov/c/github/askirmas/react-classnaming) [![Maintainability](https://api.codeclimate.com/v1/badges/6d424425b4bd07a77a43/maintainability)](https://codeclimate.com/github/askirmas/react-classnaming/maintainability) ![quailty](https://img.shields.io/scrutinizer/quality/g/askirmas/react-classnaming/main) ![version](https://img.shields.io/npm/v/react-classnaming) ![license](https://img.shields.io/npm/l/react-classnaming)

## Installation

```bash
npm install --save react-classnaming
```

## Examples of usage

Check the tests with detailed usage: [src/basic.spec.tsx](./src/basic.spec.tsx) and [src/ctx.spec.tsx](./src/ctx.spec.tsx)

With create-react-application: [./\_\_recipes\_\_/cra/src/App.tsx](./__recipes__/cra/src/App.tsx) 

### Basic

```tsx
import {classNamingBasic} from "react-classnaming"
import classNamingBasic from "react-classnaming/basic"

const {className, classNames: {class2, class3, class4, class5}} = props

<div {...classNamingBasic("class1", {class2, class3})}>
<div className={`${classNamingBasic({class4})}`}>
<div className={classNamingBasic<string>({class5})}>
```

### From css-module or simulation

```tsx
import {classNamingCtx} from "react-classnaming"
import classNamingCtx from "react-classnaming/ctx"
import css from "./some.css" // {"class1": "hash1", "class2": "hash2"}

const classNaming = classNamingCtx({className: "App", classNames: css})

<div {...classes(true, {class1: true, class2: false})}/> // className="App hash1"
<div {...classes("class2")}/> // className="hash2"
```

### TS generic for props 
```ts
import type { ClassNames } from "react-classnaming"

ClassNames<true> // requires `className`

ClassNames<"class1"|"class2"> // requires to supply `.class1` and `.class2`

ClassNames<Props1, Props2> // requires to supply `classNames` for `Props1` and `Props2` 

ClassNames<true, "class1", Props, typeof Component, typeof FunctionalComponent> //requires `className` and to supply `.class1`, `classNames` from `Props`, class component `Component` and function component `FunctionalComponent`
```

### Root apply
```tsx
import {classNamesCheck} from "react-classnaming"

ReactDOM.render( <Root classNames={classNamesCheck()}/> )
ReactDOM.render( <Root classNames={classNamesCheck<"class1"|"class2">()}/> )

import classNames from "./modules.css"

ReactDOM.render( <Root classNames={classNamesCheck(classNames))}/> )
```

## vs [classnames](https://github.com/JedWatson/classnames#readme)

See [src/versus-classnames.test.ts](./src/versus-classnames.test.ts)

### No css-modules, just simulation

```tsx
import classnames from "classnames"
<div className={classnames("class1", "class2")} />
<div id={classnames("class1", "class2")} />

/** VERSUS */

import css from "./some.css"
import {classNamesCheck, classNamingBasic} from "react-classnaming"
import type {ClassNames} from "react-classnaming"

const { class1,
  //@expect-ts-error
  whatever
} = classNamesCheck<"class1"|"class2">(css)

const props: ClassNames<"class2"> = {"classNames": css}

const {class2} = props.classNames

<div {...classNamingBasic({class1, class2})} />
<div id={classNamingBasic<string>({class1, class2})} />
```

### CSS module

```tsx
import module_css from "./some.module.css" // {"class1": "hash1", "class2": "hash2"}

import classnames_bind from "classnames/bind"
const cx = classnames_bind.bind(module_css)
// No error on redundant CSS-class
<div className={cx("class1", "class3")} />

/** VERSUS */

import {classNamingCtx} from "react-classnaming"
const classNaming = classNamingCtx({classNames: module_css})
//@ts-expect-error Argument of type '"class3"' is not assignable to parameter
<div {...classNaming("class1", "class3")} />
```
