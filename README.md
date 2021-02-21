# react-classnaming

Easy applied function to use optionally with [CSS modules](https://github.com/css-modules/css-modules) and do not get lost in CSS classes

![keywords](https://img.shields.io/github/package-json/keywords/askirmas/react-classnaming) ![test@ci](https://github.com/askirmas/react-classnaming/workflows/CI/badge.svg?branch=main) ![coverage](https://img.shields.io/codecov/c/github/askirmas/react-classnaming) ![version](https://img.shields.io/npm/v/react-classnaming) ![license](https://img.shields.io/npm/l/react-classnaming)

## Installation

```bash
npm install --save react-classnaming
```

## Examples

```tsx
import classNaming from "react-classnaming"

<div {...classNaming("class1", {class2, class3})}>
<div className={`${classNaming({class4})}`}>
<div {...classNaming(classNames)({class1: bool1}, bool2 && class2)}>
```

Check the tests with detailed usage: [./src/index.test.ts](./src/index.test.ts)

With create-react-application: [./__recipes__/cra/src/App.tsx](./__recipes__/cra/src/App.tsx) 

## TS Generic for props 
```ts
import type { ClassNames } from "react-classnaming"

ClassNames<true>

ClassNames<"class1"|"class2">

ClassNames<Props1, Props2>

ClassNames<true, "class1", Props, typeof Component1, typeof FunctionalComponent>
```

## Root apply
```tsx
import {classNamesCheck} from "react-classnaming"

ReactDOM.render( <Root classNames={classNamesCheck()}/> )
ReactDOM.render( <Root classNames={classNamesCheck<"class1"|"class2">()}/> )

import classNames from "./modules.scss"

ReactDOM.render( <Root classNames={names(classNames))}/> )
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
