# Core

[TOC]

## Interfaces chain

|                        | `null` | `{classnames}` | `{classnames, className}` | ~~`{className}`~~ |
| ---------------------- | ------ | -------------- | ------------------------- | ----------------- |
| `(string)`             | +      | -              | -                         | ~~-?~~            |
| `(ClassMap)`           | +      | +              | +                         | ~~+~~             |
| `(true)`               | -      | -              | +                         | ~~+~~             |
| `(Toggle)`             | -      | +              | +                         | ~~-~~             |
|                        |        |                |                           |                   |
| `(string, ClassMap)`   | +      | -              | -                         | ~~?~~             |
| `(true, ClassMap)`     | -      | -              | +                         | ~~+~~             |
| `(true, Toggle)`       | -      | -              | +                         | ~~-~~             |
|                        |        |                |                           |                   |
| ~~`(string, Toggle)`~~ |        |                |                           |                   |
| ~~`(true, string)`~~   |        |                |                           |                   |

```mermaid
stateDiagram-v2

[*] : No context
context_css : {classnames}
context_props : {classnames, className}

state "(map) =>" as map1
state "(map) =>" as map2

state "(string, map?) =>" as string

state "(map?, toggle?)" as key1
state "(true, map?, toggle?)" as true
state "(map?, toggle?)" as key2

[*] --> context_css
[*] --> context_props

state Stringable <<fork>>
note right of Stringable : String available

[*] --> Stringable
map1 --> Stringable
Stringable --> map1
Stringable --> string

state Stringed <<join>>
note right of Stringed : String impossible

string --> Stringed
Stringed --> map2
map2 --> Stringed

state Classing <<fork>>
note right of Classing : Classname available
context_props --> Classing
Classing --> key1
key1 --> Classing

Classing --> true

state Classed <<join>>
note right of Classed : Classname impossible
true --> Classed
Classed --> key2
key2 --> Classed

context_css --> Classed
```



## Ctx * Action

|            | hash?                  | value       | result                            |
| ---------- | ---------------------- | ----------- | --------------------------------- |
| Global CSS | `undefined`            | `undefined` | `key`                             |
| CSS module | `undefined`            | `"string"`  | `value`                           |
| Toggle off | `"hash"` | `undefined` | `false`     | -omit-                            |
| Toggle on  | `"hash"`               | `true`      | `hash`                            |
|            |                        |             |                                   |
|            | `"hash"`               | `undefined` | *`hash`? `key`? -omit-?*          |
|            | `"hash"`               | `"string"`  | *`hash`? `key`? `value`? -omit-?* |
|            | `undefined`            | `true`      | *`key`? -omit-?*                  |
|            | `"hash"` | `undefined` | `0`         | *`hash`? `key`? -omit-?*          |
|            | `"hash"` | `undefined` | `""`        | *`hash`? `key`? -omit-?*          |
|            | `"hash"` | `undefined` | `null`      | *`hash`? `key`? -omit-?*          |
|            | `"hash"` | `undefined` | `Truthy`    | *`hash`? `key`? -omit-?*          |

