import React, { PropsWithChildren } from 'react';
import logo from './logo.svg';
import type { ClassNames} from "react-classnaming"
import { classNamingBasic, classNamingCtx } from "react-classnaming"

const Header = ({className, children}: PropsWithChildren<ClassNames<true>>) =>
  <header {...{className}}>{children}</header>;

const Logo = (props: ClassNames<true, "App-logo">) => {
  const classNaming = classNamingCtx(props)
  return <img src={logo} {...classNaming(false, {"App-logo": true})} alt="logo" />
}

const Body = () => <p>Edit <code>src/App.tsx</code> and save to reload.</p>

type AppProps = ClassNames<"App"|"App_header", typeof Logo, LinkProps, typeof Body>
function AppComponent({classnames, classnames: {App}}: AppProps) {
  const classNaming = classNamingCtx({classnames}, {withClassNames: true})
  return (
    <div {...classNamingBasic({App})}>
      <Header {...classNaming("App_header")}>
        <Logo {...classNaming()}/>
        <Body/>
        <Link {...classNaming()}/>
      </Header>
    </div>
  );
}

export default AppComponent;

type LinkProps = ClassNames<"App-link">
function Link({classnames: {"App-link": appLink}}: LinkProps) {
  return <a
    {...classNamingBasic<LinkProps>({"App-link": appLink})}
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>    
}
