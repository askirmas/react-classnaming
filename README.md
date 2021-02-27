# react-classnaming

[TypeScript](https://www.typescriptlang.org/)-driven CSS classes handler for developer experience. Easily applied function to use optionally with [CSS modules](https://github.com/css-modules/css-modules) and do not get lost in CSS classes by powerful TypeScript notation

![keywords](https://img.shields.io/github/package-json/keywords/askirmas/react-classnaming) 

![build@ci](https://github.com/askirmas/react-classnaming/workflows/build/badge.svg?branch=main)
![coverage](https://img.shields.io/codecov/c/github/askirmas/react-classnaming)
[![Maintainability](https://api.codeclimate.com/v1/badges/6d424425b4bd07a77a43/maintainability)](https://codeclimate.com/github/askirmas/react-classnaming/issues)
[![quailty](https://img.shields.io/scrutinizer/quality/g/askirmas/react-classnaming/main)](https://scrutinizer-ci.com/g/askirmas/react-classnaming/)
[![dependencies Status](https://status.david-dm.org/gh/askirmas/react-classnaming.svg)](https://david-dm.org/askirmas/react-classnaming)
[![version](https://img.shields.io/npm/v/react-classnaming)](https://www.npmjs.com/package/react-classnaming)
![license](https://img.shields.io/npm/l/react-classnaming)

[TOC]

## Installation

```bash
npm install --save react-classnaming
```

## Key features

#### Declarative style programming

```tsx
import classNaming from "react-classnaming"
const {
  "classnames": {App, App__Item}
} = props
<div {...classNaming({App, App__Item})} />
```
```tsx
import type {ClassNamesProperty, ClassHash} from "react-classnaming"
type ComponentClassNames = ClassNamesProperty<{
  App: ClassHash
  App__Item: ClassHash
}>
```

```tsx
import type {ClassNames} from "react-classnaming"
type AppProps = {
  isMyAppGreat: boolean
} & ClassNames<
  true, // props.className: string
  AppClassNames,
  ComponentProps,
  typeof ClassComponent,
  typeof FunctionalComponent
>
```

#### Returning *stringable* object

```typescript
<div {...classNaming({App})} data-block={`${classNaming({App})}`} />
```

#### Reusability by pipe calls

```tsx
const c = classNaming(className) // className: "Cell"
, Col1 = c({ Column_1 })
, Col2 = c({ Column_2 })

<div {...Col1({ Row_1 })} />; // className="Cell Column_1 Row_1"
<div {...Col1({ Row_2 })} />; // className="Cell Column_1 Row_2"
<div {...Col2({ Row_1 })} />; // className="Cell Column_2 Row_1"
<div {...Col2({ Row_2 })} />; // className="Cell Column_2 Row_2"
```

#### Single interface

```typescript
classNaming({classnames, className}) // Start with context
classNaming({App, App__Item}) // Destructed
classNaming({App: true, App__Item: false}) // Toggling
```

#### Class names control by type check of keys

*//TODO add example*

#### Playing together with IDE renames

*//TODO add example*

#### With and without CSS modules

```tsx
import css from "./css" // css === {}
import module_css from "./module_css" // module_css === {"class1": "hash1", ...}

<App classnames={css} />;
<App classnames={module} />;
```

## Examples of usage

Check the tests with detailed usage: [src/direct.spec.tsx](./src/direct.spec.tsx) and [src/toggling.spec.tsx](./src/toggling.spec.tsx)

With create-react-application: [./\_\_recipes\_\_/create-react-app/src/App.tsx](./__recipes__/create-react-app/src/App.tsx) 

### Direct (via property destruct)

```tsx
import classNaming from "react-classnaming"

const {
  className, // "class1"
  "classnames": {
    class2, // "hash2"
    class3, // undefined
	}
} = props

<div {...classNaming(className, {class2, class3})} />; // className="class1 hash2 class3"
<div className={`${classNaming({class2, class3})}`} />; // className="hash2 class3"
```

### Toggling

```tsx
import classNaming from "react-classnaming"
import css from "./some.css" // {"class1": "hash1"}

const classes = classNaming({className: "App", classnames: css})

<div {...classes(true, {class1: true, class2: false})} />; // "App hash1"
<div {...classes({class2: true})} />; // "class2"
```

### Chaining

```tsx
import classNaming from "react-classnaming"

const {
  className, // "Cell"
  "classnames": {
    Column_1, Column_2,
    Row_1, Row_2
}} = props
, c = classNaming(className)
, col1 = c({Column_1})
, col2 = c({Column_2})

<div {...col1({ Row_1 })} />; // "Cell Column_1 Row_1"
<div {...col1({ Row_2 })} />; // "Cell Column_1 Row_2"
<div {...col2({ Row_1 })} />; // "Cell Column_2 Row_1"
<div {...col2({ Row_2 })} />; // "Cell Column_2 Row_2"
<div {...classNaming({ Column_1 })({ Column_2 })({ Row_1 })({ Row_2 })} /> // "Column_1 Column_2 Row_1 Row_2"
```

### Mixed usage

//TODO Add practical example

### TS generic for gathering 

```typescript
import type { ClassNames, ClassNamed } from "react-classnaming"

ClassNames<true> === ClassNamed // requires `className`

ClassNames<Props1, Props2> // requires to supply `classnames` for `Props1` and `Props2` 

ClassNames<true, Props, typeof Component, typeof FunctionalComponent> //requires `className` and to supply `classnames` from `Props`, class component `Component` and function component `FunctionalComponent`
```

###  TS generic for `props` declaration

```typescript
import type { ClassNamesProperty, ClassHash } from "react-classnaming"

type Props = ClassNamesProperty<{
  class1: ClassHash
  class2: ClassHash
}>
```

### Root apply

```tsx
import {classNamesCheck} from "react-classnaming"

ReactDOM.render( <Root classnames={classNamesCheck()}/> )

import css from "./module.css"

ReactDOM.render( <Root classnames={classNamesCheck(css))} /> )
ReactDOM.render( <Root classnames={classNamesCheck<typeof Root, typeof css>(css))} /> )
```

## Versus [`classnames`](https://github.com/JedWatson/classnames#readme) package

See [src/versus-classnames.test.ts](./src/versus-classnames.test.ts)

//TODO Copy here the most significant TS errors

### No css-modules, just simulation

```tsx
import classnames from "classnames"
<div className={classnames("class1", "class2")} />
<div id={classnames("class1", "class2")} />

// VERSUS

import css from "./some.css"
import classNaming, {classNamesCheck} from "react-classnaming"
import type {ClassNames} from "react-classnaming"

const { class1,
  //@ts-expect-error
  whatever
} = classNamesCheck<...>(css)

const props: ClassNames<"class2"> = {"classnames": css}

const {class2} = props.classnames

<div {...classNaming({class1, class2})} />
<div id={`${classNaming({class1, class2})}`} />
```

### CSS module

```tsx
import module_css from "./some.module.css" // {"class1": "hash1", "class2": "hash2"}

import classnames_bind from "classnames/bind"
const cx = classnames_bind.bind(module_css)
// No error on redundant CSS-class
<div className={cx("class1", {"class3": true})} />

// VERSUS

import classNaming from "react-classnaming"
const clases = classNaming({classnames: module_css})
//@ts-expect-error Argument of type '"class3"' is not assignable to parameter
<div {...clases({class1: true, class3: true})} />
```

## Getting Started

### Component usage: `classNames`

### Component declaration: `ClassNamesProperty`, `ClassHash`

### Collecting: `ClassNames`

### Root supply: `classNamesCheck`

### With `*.css.d.ts`
