import type { PropsWithChildren } from "react";
import classNaming from "react-classnaming"
import type { ClassNames } from "react-classnaming"

type AppProps = PropsWithChildren<
  {
    "className"?: string
  }
  & ClassNames<"App__container"|"App__header"|"App__link"|"NotExistent">
>

function App({
  className,
  classNames: {
    App__container, App__header, App__link
  }
}: AppProps) {
  return (
    <div {...classNaming(className, {App__container})}>
      <header className={classNaming<string>({App__header})}>
        <a {...{
          ...classNaming({App__link}),
          "href": "https://reactjs.org",
          "target": "_blank",
          "rel": "noopener noreferrer",
        }}>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
