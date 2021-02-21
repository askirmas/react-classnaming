import { Component, LinkHTMLAttributes, PropsWithChildren } from "react";
import {classNamingBasic, classNamingCtx} from "react-classnaming"
import type { ClassNames } from "react-classnaming"

type AppProps = PropsWithChildren<
  ClassNames<
    true,
    "App__Container"|"App__Header"|"App__Content"|"NotExistent", 
    LinkProps, typeof Header, typeof Content
  >
>

function App({
  className,
  classNames, classNames: {
    App__Container
  }
}: AppProps) {
  const classes = classNamingCtx({classNames}, {withClassNames: true})

  return (
    <div
      {...classNamingBasic(className, {App__Container})}
      id={classNamingBasic<string>({App__Container})}
    >
      <Header
        // TODO Why TS doesn't check object
        {...classes({App__Header: true})}
        //@ts-expect-error Property 'className' does not exist
        className="" 
      />
      <Content {...{
        ...classes(),
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
    ...classNamingBasic({App__link}),
    href,
    "target": "_blank",
    "rel": "noopener noreferrer"
  }}>{
    children
  }</a>
}

function Header({classNames: {Header}}: ClassNames<"Header">) {
  return <header {...classNamingBasic({Header})}>Header</header>
}
class Content extends Component<PropsWithChildren<ClassNames<true, "Content">>> {
  render() {
    const {
      className,
      classNames: {Content},
      children
    } = this.props

    return <main {...classNamingBasic(className, {Content})}>{children}</main>
  }
}

export default App;
