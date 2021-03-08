import { classNamesMap } from "../src/map";
import classNaming from '../src';

const module_css = {
  class1: "hash1",
  class2: "hash2"
}

type ThirdPartyComponentProps = {
  checked?: boolean
  ContainerClassName: string
  CheckedClassName?: string
  NotCheckedClassName?: string
}  

const mapping = classNamesMap(module_css)

it("classNaming as values", () => {
  const classes = classNaming({classnames: module_css})
  expect(mapping<ThirdPartyComponentProps>({
    //@ts-expect-error //TODO #27
    ContainerClassName: classes({class1: true})
  })).toStrictEqual({
    ContainerClassName: "hash1"
  })
})

describe("type checks", () => {
  it("No unknown source keys", () => {
    const mapped = mapping<ThirdPartyComponentProps>({
      ContainerClassName: {
        //@ts-expect-error Object literal may only specify known properties, but 'class3' does not exist
        class3: true
      }
    })
    expect(mapped).toStrictEqual({ContainerClassName: "class3"})
  })

  it("Strict action", () => {
    const {act} = {} as {act?: boolean}
    , mapped = mapping<ThirdPartyComponentProps>({
      //TODO @ts-expect-error
      ContainerClassName: {class2: act},
    })

    expect(mapped).toStrictEqual({ContainerClassName: "hash2"})
  })

  it("return keys", () => {
    const mapped = mapping<ThirdPartyComponentProps>({
      ContainerClassName: {class2: true},
    })
    , check: Record<string, typeof mapped> = {
      //TODO #25 @ts-expect-error
      "empty": {},
      "redundant": {
        ContainerClassName: "hash2",
        //TODO #25 @ts-expect-error
        CheckedClassName: "hash1",
      }
    }
    expect(check).toBeInstanceOf(Object)
  })
})
