import { ClassNamed } from "./defs"

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

function stringifyClassNamed<T extends ClassNamed>(source: T) :T {
  if (!source.hasOwnProperty(stringifyProperty))
    $defineProperty(source, stringifyProperty, StringifyDescriptor)
  
  return source
}

function classNamedToString(this: ClassNamed) {
  //TODO `?? ""`
  return this.className
}

// TODO not `undefined`
function emptize(source: undefined|Record<string, any>) {
  if (
    source
    && !source.hasOwnProperty(stringifyProperty)
  )
    $defineProperty(source, stringifyProperty, EmptyDescriptor)

  return source
}

function emptyLambda() {
  return "" as const
}
