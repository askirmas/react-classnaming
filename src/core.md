# Core

[TOC]

## Interfaces chain

|                        | `null` | `{classnames}` | `{classnames, className}` | ~~`{className}`~~ |
| ---------------------- | ------ | -------------- | ------------------------- | ----------------- |
| `(string)`             | +      | -?             | -?                        | ~~-?~~            |
| `(ClassMap)`           | +      | +?             | +?                        | ~~+~~             |
| `(true)`               | -      | -              | +                         | ~~+~~             |
| `(Toggle)`             | -      | +              | +                         | ~~-~~             |
|                        |        |                |                           |                   |
| `(string, ClassMap)`   | +      | ?              | ?                         | ~~?~~             |
| `(true, ClassMap)`     | -      | -              | +?                        | ~~+~~             |
| `(true, Toggle)`       | -      | -              | +                         | ~~-~~             |
|                        |        |                |                           |                   |
| ~~`(string, Toggle)`~~ |        |                |                           |                   |
| ~~`(true, string)`~~   |        |                |                           |                   |

```mermaid
graph LR
%% context_null -.-> call_className -.-> context_className
context_null --> call_classnames --> context_classnames
context_null --> call_ctx --> context_full

context_null --> call_inject
context_null --> call_map
context_null --> call_inject_map

%% context_className -.-> call_true
%% context_className -.-> call_map
%% context_className -.-> call_true_map

context_classnames --> call_toggle
context_classnames --> call_map
context_classnames --> call_inject
context_classnames --> call_inject_map

context_full --> call_true
context_full --> call_map
context_full --> call_toggle
context_full --> call_true_map
context_full --> call_true_toggle

call_true --> classNameWasUsed
call_true_map --> classNameWasUsed
call_true_toggle --> classNameWasUsed

classNameWasUsed --> call_toggle
classNameWasUsed --> call_map

context_null["{}"]
context_classnames["{classnames}"]
%% context_className["{className}"]
context_full["{classnames, className}"]

classNameWasUsed

%% call_className{{"({className}) =>"}}
call_classnames{{"({classnames}) =>"}}
call_ctx{{"({classnames, className}) =>"}}

call_true{{"(true) =>"}}
call_inject{{"(string) =>"}}
call_map{{"(ClassMap) =>"}}
call_toggle{{"(Toggle) =>"}}

call_true_toggle{{"(true, Toggle) =>"}}
call_inject_map{{"(string, ClassMap) =>"}}
call_true_map{{"(true, ClassMap) =>"}}
%% call_inject_toggle{{"(string, Toggle) =>"}}

subgraph ctx
context_null
context_classnames
%% context_className
context_full
%% call_className
call_ctx
call_classnames
end

%% subgraph calls_classnamesless
%% call_map
%% call_toggle
%% end

subgraph calls_classnamed
call_true
call_true_toggle
call_true_map
end

subgraph calls_inject
call_inject
call_inject_map
end
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

