export type BemAbsraction = {
  [block: string]: boolean | {
    $?: {
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
      , element = el === "$" ? block : `${block}__${el}`
      
      if (!elementQ) {
        el === "$" && $return.push(element)
        continue
      }
      
      $return.push(element)

      if (typeof elementQ !== "object")
        continue

      for (const mod in elementQ) {
        const modValue: string|boolean = elementQ[mod]
        if (!modValue)
          continue

        $return.push(`${element}--${mod}${
          typeof modValue !== "string"
          ? ""
          : `--${modValue}`
        }`)
      }
    }
  }
  
  return $return
}