import { Component, LinkHTMLAttributes, PropsWithChildren } from "react";
import classNaming from "react-classnaming"
import type { ClassNames, ClassNamesFrom, ClassName } from "react-classnaming"

type AppProps = PropsWithChildren<
  ClassName
  & ClassNames<"App__Container"|"App__Header"|"App__Content"|"NotExistent">
  & ClassNamesFrom<LinkProps, typeof Header, typeof Content>
>

function App({
  className,
  classNames, classNames: {
    App__Container, App__Header, App__Content
  }
}: AppProps) {
  return (
    <div {...classNaming(className, {App__Container})}>
      <Header {...{...classNaming({App__Header}), classNames}}/>
      <Content {...classNaming({App__Content})} {...{classNames}}>
        <Link {...{classNames}} href="https://reactjs.org">
          Learn React
        </Link>
      </Content>
    </div>
  );
}

// OTHER MODULES

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

function Header({className, classNames: {Header}}: ClassName & ClassNames<"Header">) {
  return <header {...classNaming(className, {Header})}>Header</header>
}
class Content extends Component<PropsWithChildren<ClassName & ClassNames<"Content">>> {
  render() {
    const {
      className,
      classNames: {Content},
      children
    } = this.props

    return <main {...classNaming(className, {Content})}>{children}</main>
  }
}

export default App;
