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


## Key valued features

- Declarative style programming
- Returning *stringable* object
- Reusability by pipe calls
- Single interface
- Class names control by type check of keys
- Playing together with IDE renames
- With and without CSS modules

## Installation

```bash
npm install --save react-classnaming
```

## Basic usage
```tsx
import { Cell } from "./some.css"
import classNaming from "react-classnaming"

function Component() {
  const classes = classNaming()
  , Column_1 = classes({Cell, Column_1: true})
  , Cell_1_1 = Column_1({
    Row_1: true,
    //@ts-expect-error
    //Column_1: true
  })

  return <div {...Cell_1_1} data-class={`${Cell_1_1}`}/>
}
```

## Examples @ specs

Check the tests with detailed usage: [src/direct.spec.tsx](./src/direct.spec.tsx) and [src/toggling.spec.tsx](./src/toggling.spec.tsx)

With create-react-application: [./\_\_recipes\_\_/create-react-app/src/App.tsx](./__recipes__/create-react-app/src/App.tsx) 


## Reference

### type `ClassNamed`
Useful to not set each time `className: string`. 

### type `ClassHash`
For serving ordinary and modules CSS. Module will bring to TS `Record<string, string>` while global CSS just empty object `{}`. Thus, `type ClassHash = string | undefined`

### function [`classNaming`](https://github.com/askirmas/react-classnaming/projects/1)

Sets *context* for type checks, and then...

```typescript
  const classes = classNaming(this.props)
  const classes = classNaming({classnames: require("./some.css"), className?})
  const classes = classNaming<Props>()
  const classes = classNaming<MyClassNames>()
```
---
```typescript
  classes();
  classes(true);
  classes({App}); classes({App: true, "App--bad": false});

  const btn = classes({Btn})
  , disabledBtn = btn(true, {Btn__disabled: true});
```
---
```tsx
  <div {...classes(...)} />
  <div data-block={`${classes(...)}`} />
  <Component {...{
    ...classes(...)(...)(...)},
    ...classnames
  }/>
```

### type [`ClassNames`](https://github.com/askirmas/react-classnaming/projects/2)

Collects/gathers required `classnames` from used sub-Components

```typescript
type Props = ClassNames<true> // {className: string}
type Props = ClassNames<Props> // {classnames: Props["classnames"]}
type Props = ClassNames<typeof Component>
type Props = ClassNames<true, Props, typeof ClassComponent, typeof FunctionalComponent>
```

### type [`ClassNamesProperty`](https://github.com/askirmas/react-classnaming/projects/3)

Declaration of self Component's `classnames`

```typescript
  type MyClasses = ClassNamesProperty<{
    class1: ClassHash
    class2: ClassHash
  }>

  type MyProps = ClassNamesProperty<
    typeof some_module_css,
    {class1: ClassHash, class2: ClassHash}
  >
```

### function [`classNamesCheck`](https://github.com/askirmas/react-classnaming/projects/4) 

... #16

### function [`classNamesMap`](https://github.com/askirmas/react-classnaming/projects/5)

Function to map one `classnames` to another

```tsx
  <Component {...mapping<ComponentProps>({
    Container: { Root, "Theme--dark": true },
    Checked___true: { "Item--active": true },
    Checked___false: {}
  })}/>
```

## Getting Started //TODO

- Component usage: `classNames`

- Component declaration: `ClassNamesProperty`, `ClassHash`

- Collecting: `ClassNames`

- Root supply: `classNamesCheck`

- With `*.css.d.ts`


### Root apply

```tsx
import {classNamesCheck} from "react-classnaming"

ReactDOM.render( <Root classnames={classNamesCheck()}/> )

import css from "./module.css"

ReactDOM.render( <Root classnames={classNamesCheck(css))} /> )
ReactDOM.render( <Root classnames={classNamesCheck<typeof Root, typeof css>(css))} /> )
```

## Explaining and recipes

### Declarative style programming

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

### Returning *stringable* object

```typescript
<div {...classNaming({App})} data-block={`${classNaming({App})}`} />
```

### Reusability by pipe calls

```tsx
const c = classNaming(className) // className: "Cell"
, Col1 = c({ Column_1 })
, Col2 = c({ Column_2 })

<div {...Col1({ Row_1 })} />; // className="Cell Column_1 Row_1"
<div {...Col1({ Row_2 })} />; // className="Cell Column_1 Row_2"
<div {...Col2({ Row_1 })} />; // className="Cell Column_2 Row_1"
<div {...Col2({ Row_2 })} />; // className="Cell Column_2 Row_2"
```

### Class names control by type check of keys

*//TODO add example*

### Playing together with IDE renames

*//TODO add example*

### With and without CSS modules

```tsx
import css from "./css" // css === {}
import module_css from "./module_css" // module_css === {"class1": "hash1", ...}

<App classnames={css} />;
<App classnames={module} />;
```

## Misc 

### Versus [`classnames`](https://github.com/JedWatson/classnames#readme) package

See [src/versus-classnames.test.ts](./src/versus-classnames.test.ts)

//TODO Copy here the most significant TS errors

#### No css-modules, just simulation

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

#### CSS module

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
