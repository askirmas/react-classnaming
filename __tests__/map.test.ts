import { classNamesMap } from "../src/map";
import classNaming from '../src';

const module_css = {
  class1: "hash1",
  class2: "hash2"
}

type ThirdPartyComponentProps = {
  notString?: boolean
  required: string
  optional?: string
  stringAndOthers?: string | Object
  [x: string]: any
}  

const mapping = classNamesMap(module_css)

it("classNaming as values", () => {
  const classes = classNaming({classnames: module_css})
  expect(mapping<ThirdPartyComponentProps>({
    //@ts-expect-error //TODO #27
    required: classes({class1: true})
  })).toStrictEqual({
    required: "hash1"
  })
})

describe("type checks", () => {
  it("No unknown source keys", () => {
    const mapped = mapping<ThirdPartyComponentProps>({
      required: {
        //@ts-expect-error Object literal may only specify known properties, but 'class3' does not exist
        class3: true
      }
    })
    expect(mapped).toStrictEqual({required: "class3"})
  })

  it("No unknown target keys", () => {
    const mapped = mapping<ThirdPartyComponentProps>({
      //@ts-expect-error Object literal may only specify known properties, and '"unknown"' does not exist
      unknown: {
        class1: true
      }
    })

    expect(mapped).toStrictEqual({unknown: "hash1"})
  })

  it("No target keys without string value type", () => {
    const mapped = mapping<ThirdPartyComponentProps>({
      //@ts-expect-error Object literal may only specify known properties, and 'notString' does not exist
      notString: {
        class1: true
      }
    })

    expect(mapped).toStrictEqual({notString: "hash1"})
  })

  it("All keys string value type", () => {
    const mapped = mapping<ThirdPartyComponentProps>({
      required: {class1: true},
      optional: {class2: true},
      stringAndOthers: {class1: true, class2: true}
    })

    expect(mapped).toStrictEqual({
      required: "hash1",
      optional: "hash2",
      stringAndOthers: "hash1 hash2"
    })
  })

  it("Strict action", () => {
    const {act} = {} as {act?: boolean}
    , mapped = mapping<ThirdPartyComponentProps>({
      //TODO @ts-expect-error
      required: {class2: act},
    })

    expect(mapped).toStrictEqual({required: "hash2"})
  })

  it("return keys", () => {
    const mapped = mapping<ThirdPartyComponentProps>({
      required: {class2: true},
    })
    , check: Record<string, typeof mapped> = {
      //TODO #25 @ts-expect-error
      "empty": {},
      "redundant": {
        required: "hash2",
        //TODO #25 @ts-expect-error
        optional: "hash1",
      }
    }
    expect(check).toBeInstanceOf(Object)
  })
})
