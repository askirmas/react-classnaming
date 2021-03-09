
import React from "react"
import { classNaming } from "react-classnaming"
import type { ClassNamesProperty, ClassHash } from "react-classnaming/types"

type MyComponentProps = ClassNamesProperty<{
  btn: ClassHash
  icon: ClassHash
  btn__icon: ClassHash
}>
export default function MyComponent({classnames}: MyComponentProps) {
  const cssClasses = classNaming({classnames})
                 
  return <>
    { "/// MyComponent.tsx" }
            {/* className="btn" */}
    <button {...cssClasses({btn: true})}>
         {/* className="btn__icon icon" */}
      <i {...cssClasses({btn__icon: true, icon: true})}/>
    </button>
  </>
}
