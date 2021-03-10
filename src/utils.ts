import { ClassNamed } from "./types"

const stringifyProperty: SymbolConstructor["toPrimitive"] | "valueOf" | "toString"  = Symbol.toPrimitive

const {
  defineProperty: $defineProperty
} = Object
, EmptyDescriptor = {value: emptyLambda}
, StringifyDescriptor = {value: classNamedToString}

export {
  emptize,
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

//TODO delete
function emptize(source: Record<string, any>) {
  if (!source.hasOwnProperty(stringifyProperty))
    $defineProperty(source, stringifyProperty, EmptyDescriptor)

  return source
}

function emptyLambda() {
  return "" as const
}
