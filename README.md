# react-classnaming

Easy applied function to use with [CSS modules](https://github.com/css-modules/css-modules) and do not get lost in CSS classes

![keywords](https://img.shields.io/github/package-json/keywords/askirmas/react-classnaming) ![test@ci](https://github.com/askirmas/react-classnaming/workflows/CI/badge.svg?branch=main) ![coverage](https://img.shields.io/codecov/c/github/askirmas/react-classnaming) ![version](https://img.shields.io/npm/v/react-classnaming) ![license](https://img.shields.io/npm/l/react-classnaming)

## Installation

```bash
npm install --save react-classnaming
```

## Examples

```tsx
import classNaming from "react-classnaming"

<div {...classNaming("class1", {class2, class3})}>
<div className={classNaming<string>({class4})}>
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