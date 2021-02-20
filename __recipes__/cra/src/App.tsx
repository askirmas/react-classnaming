import { Component, LinkHTMLAttributes, PropsWithChildren } from "react";
import classNaming from "react-classnaming"
import type { ClassNames, ClassNamesFrom } from "react-classnaming"

type AppProps = PropsWithChildren<
  ClassNames<true, "App__Container"|"App__Header"|"App__Content"|"NotExistent">
  & ClassNamesFrom<LinkProps, typeof Header, typeof Content>
>

function App({
  className,
  classNames, classNames: {
    App__Container
  }
}: AppProps) {
  const classToggler = classNaming(classNames)

  return (
    <div {...classNaming(className, {App__Container})} id={classNaming<string>({App__Container})} {...{classNames: {
      toString: () => undefined
    }}}>
      <Header
        // TODO Why TS doesn't check object
        {...classToggler({App__Header: true})}
        {...{classNames}}
        //@ts-expect-error Property 'className' does not exist
        className="" 
      />
      <Content {...{
        ...classToggler("App__Content"),
        classNames
      }}>
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

function Header({classNames: {Header}}: ClassNames<"Header">) {
  return <header {...classNaming({Header})}>Header</header>
}
class Content extends Component<PropsWithChildren<ClassNames<true, "Content">>> {
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
