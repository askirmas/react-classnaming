import postcss from "postcss"
//@ts-expect-error
import postcssDTs = require("postcss-d-ts")
import {readFileSync} from "fs"

const producer = postcss([postcssDTs()])

produce([
  "bootstrap3/dist/css/bootstrap.css",
  "bootstrap4/dist/css/bootstrap.css",
  "material10/dist/material-components-web.css"
])

async function produce(sources: string[]) {
  for (let i = sources.length; i--;) {
    const p = sources[i]
    , name = p.replace(/\/.*$/, "")
    , path = require.resolve(p)
  
    await producer.process(readFileSync(path).toString(), {
      from: `${__dirname}/${name}.css`
    })  
  }
}