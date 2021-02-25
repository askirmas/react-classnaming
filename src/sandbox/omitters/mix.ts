export {}
type ClassHash = string | undefined

type Props = {
  Btn: ClassHash
  isValid: boolean
  isOpen?: boolean
}

const {
  Btn,
  isOpen,
  isValid
} = {} as Props

classNaming(
  guard1({Btn, Btn__Open: isOpen, Btn__Valid: isValid})
)
//@ts-expect-error
guard2({Btn, Btn__Open: isOpen, Btn__Valid: isValid})

function guard1<
  E extends Record<string, ClassHash|boolean> 
>(source: E) { 
  return source as unknown as {[K in keyof E]: E[K] extends boolean ? boolean : E[K] extends ClassHash ? ClassHash : never}
}

function guard2<T>(source: T extends Record<infer K, ClassHash|boolean> ? {
  [k in K]: T[k] extends boolean ? T[k] : T[k] extends ClassHash ? T[k] : never
 } : never) { 
  return source 
}

function classNaming<T>(source: T) {
  return source
}