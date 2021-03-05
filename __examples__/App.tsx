import React from "react"
import classNaming, {classNamesMap} from "../src"
import type { ClassNames, ClassNamesProperty, ClassHash, ClassNamed} from "../src"

import MyComponent from "./MyComponent"
import ThirdParty, { ThirdPartyProps } from "./node_modules-third_party_component"

type AppClassNames = ClassNamed & ClassNamesProperty<{
  "app__container": ClassHash
  "app__item": ClassHash
}>
type AppProps = AppClassNames & ClassNames<typeof MyComponent>

export default function App(props: AppProps) {
  const myCssClasses = classNaming<AppClassNames>(props)
  const withClassName = myCssClasses(true) // `${className}`

  const {classnames} = props

  const cssClassesMapping = classNamesMap(classnames)
     
  return <>{ "/// App.tsx" }
         {/* className=`${className} app__container` */}
    <div {...withClassName({"app__container": true})}>
      <MyComponent {...{
        classnames,
        // className: `${className} app__item`
        ...withClassName({"app__item": true})
      }} />
      <ThirdParty {
        ...cssClassesMapping<ThirdPartyProps>({
                              // "app__item"
          containerClassName: { "app__item": true }
        })
      } />
    </div>
  </>
}
