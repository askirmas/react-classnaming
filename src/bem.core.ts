const elementDelimiter = "__"
, modDelimiter = "--"
, blockModKey = "$" as const

export type BemAbsraction = {
  [block: string]: boolean | {
    [blockModKey]?: {
      [mod: string]: boolean | string
    }
    [el: string]: undefined|boolean | {
      [mod: string]: boolean | string
    }
  }
}

export {
  bem2arr
}

function bem2arr(query: BemAbsraction) {
  const $return: string[] = []

  for (const block in query) {
    const blockQ = query[block]
    
    if (!blockQ) 
      continue
    if (typeof blockQ !== "object") {
      $return.push(block)
      continue
    }

    for (const el in blockQ) {
      const elementQ = blockQ[el]
      , element = el === blockModKey ? block : `${block}${elementDelimiter}${el}`
      
      if (!elementQ) {
        el === blockModKey && $return.push(element)
        continue
      }
      
      $return.push(element)

      if (typeof elementQ !== "object")
        continue

      for (const mod in elementQ) {
        const modValue: string|boolean = elementQ[mod]
        if (!modValue)
          continue

        $return.push(`${element}${modDelimiter}${mod}${
          typeof modValue !== "string"
          ? ""
          : `${modDelimiter}${modValue}`
        }`)
      }
    }
  }
  
  return $return
}