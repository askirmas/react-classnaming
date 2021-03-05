export {}

type BemTree = {
 [block: string]: {
     // ""?: {[blockMod: string]: true}
     [element: string]: boolean | {[elMod: string]: boolean} 
 }
}

type El2Classes<DMod extends string, S extends Record<string, boolean|Record<string, boolean>>> = {[K in string & keyof S]:
 K | (S[K] extends Record<string, boolean> ? `${K}${DMod}${string & keyof S[K]}` : never)
}[string & keyof S]

type BemTree2Classes<DEl extends string, DMod extends string, S extends BemTree> = {[K in string & keyof S]:
 K | `${K}${DEl}${El2Classes<DMod,S[K]>}`
}[string & keyof S]


it("1", () => {
  const bem2 = {
    "Button": {
       "Container": true,
       "Icon": {
           "small": true,
           "big": true
       }
   },
   "Form": {
       "Container": true,
       "Button": true
   }   
  }
  
  const check: Record<BemTree2Classes<"__", "--", typeof bem2>, boolean> = {
    Button: true,
    Button__Icon: true,
    "Button__Icon--big": true,
    "Button__Icon--small": true,
    Button__Container: true,
    Form: true,
    Form__Button: true,
    Form__Container: true
   }

  expect(check).toBeInstanceOf(Object)     
})
