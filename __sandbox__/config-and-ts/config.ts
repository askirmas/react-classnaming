/// <reference path="./config-types.d.ts"/>

export {}

const options = {
  current: {
    elementDelimiter: "__" as const,
    modDelimiter: "--" as const,
    blockModKey: "$" as const,
  }
}


export {
  setOpts, getOpts
}

function setOpts<e extends string, m extends string, b extends string>(
  elementDelimiter: e,
  modDelimiter: m,
  blockModKey: b
) {
  const current = {
    elementDelimiter,
    modDelimiter,
    blockModKey
  }

  //@ts-expect-error
  options.current = current
}

function getOpts() {
  return options.current as {
    elementDelimiter: "elementDelimiter" extends keyof Bem.Options
    ? Bem.Options["elementDelimiter"]
    : Bem.Options["$default"]["elementDelimiter"]
    modDelimiter: "modDelimiter" extends keyof Bem.Options
    ? Bem.Options["modDelimiter"]
    : Bem.Options["$default"]["modDelimiter"]
    blockModKey:
    "blockModKey" extends keyof Bem.Options
    ? Bem.Options["blockModKey"]
    : Bem.Options["$default"]["blockModKey"]
  }
}