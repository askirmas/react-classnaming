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

function stringifyClassNamed<T extends {className: string}>(source: T) :T {
  if (!source.hasOwnProperty(stringifyProperty))
    $defineProperty(source, stringifyProperty, StringifyDescriptor)
  
  return source
}

function classNamedToString(this: {className: string}) {
  return this.className
}

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
