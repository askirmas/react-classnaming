import type { LinkHTMLAttributes, PropsWithChildren } from "react";
import classNaming from "react-classnaming"
import type { ClassNames, ClassNamesFrom } from "react-classnaming"

type AppProps = PropsWithChildren<
  {"className"?: string}
  & ClassNames<"App__container"|"App__header"|"NotExistent">
  & ClassNamesFrom<LinkProps, typeof Link>
>

function App({
  className,
  classNames, classNames: {
    App__container, App__header
  }
}: AppProps) {
  return (
    <div {...classNaming(className, {App__container})}>
      <header className={classNaming<string>({App__header})}>
        <Link {...{classNames}} href="https://reactjs.org">
          Learn React
        </Link>
      </header>
    </div>
  );
}

type LinkProps = ClassNames<"App__link"> & PropsWithChildren<LinkHTMLAttributes<HTMLLinkElement>>

function Link({href, children, "classNames": {App__link}}: LinkProps) {
  return <a {...{
    ...classNaming({App__link}),
    href,
    "target": "_blank",
    "rel": "noopener noreferrer"
  }}>{
    children
  }</a>
}

export default App;
