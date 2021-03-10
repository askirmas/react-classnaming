import { ClassNamed } from "./types"

const stringifyProperty: SymbolConstructor["toPrimitive"] | "valueOf" | "toString"  = Symbol.toPrimitive

const {
  defineProperty: $defineProperty
} = Object
, StringifyDescriptor = {value: classNamedToString}

export {
  stringifyClassNamed,
}
// TODO move to `core`
function stringifyClassNamed<T extends ClassNamed>(source: T) :T {
  if (!source.hasOwnProperty(stringifyProperty))
    $defineProperty(source, stringifyProperty, StringifyDescriptor)
  
  return source
}

function classNamedToString(this: ClassNamed) {
  //TODO `?? ""`
  return this.className
}
