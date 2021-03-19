import type { primitive } from "ts-swiss.types"
import type { BemInGeneral } from "./bem.types"

const {isArray: $isArray} = Array

let modDelimiter = "--"
, elementDelimiter = "__"

export type BemOptions = {
  elementDelimiter: string
  modDelimiter: string
}

export {
  bem2arr,
  setOptions
}

function bem2arr(query: BemInGeneral) {
  const $return: string[] = []

  for (const base in query) {
    const baseQ = query[base]
    $return.push(base)

    if (!baseQ)
      continue
    if (typeof baseQ !== "object") {
      if (typeof baseQ === "string")
        $return.push(`${base}${modDelimiter}${baseQ}`)
      continue
    }

    if (!$isArray(baseQ))
      $return.push(...mods2arr(base, baseQ))
    else {
      const {length} = baseQ

      for (let i = 0; i < length; i++) {
        const modQ = baseQ[i]

        if (modQ === false)
          continue
          
        if (modQ !== null && typeof modQ === "object")
          $return.push(...mods2arr(base, modQ))
        else
          $return.push(bmv(base, modQ))
      }
    }
  }

  return $return
}

function mods2arr(base: string, mods: Record<string, primitive>) {
  const classes = []

  for (const mod in mods) {
    const value = mods[mod]
    if (value === false)
      continue

    classes.push(bmv(base, mod, value))
  }

  return classes
}

function bmv(base: string, mod: string, value: Exclude<primitive, false> = true) {
  return `${base}${modDelimiter}${mod}${
    value === true
    ? ""
    : `${modDelimiter}${value}`
  }`
}

function setOptions({
  elementDelimiter: elD = elementDelimiter,
  modDelimiter: modDel = modDelimiter
}: Partial<BemOptions>) {
  modDelimiter = modDel
  elementDelimiter = elD
}
