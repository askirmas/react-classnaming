import React, { PropsWithChildren } from 'react';
import logo from './logo.svg';
import type { ClassNames, ClassNamesProperty, ClassHash} from "react-classnaming"
import { classNamingCtx } from "react-classnaming"

const Header = ({className, children}: PropsWithChildren<ClassNames<true>>) =>
  <header {...{className}}>{children}</header>;

const Logo = (props: ClassNames<true, ClassNamesProperty<{"App-logo": ClassHash}>>) => {
  const classNaming = classNamingCtx(props)
  return <img src={logo} {...classNaming({"App-logo": true})} alt="logo" />
}

const Body = () => <p>Edit <code>src/App.tsx</code> and save to reload.</p>

type AppClassNames = ClassNamesProperty<{
  App: ClassHash
  App_header: ClassHash
}>
type AppProps = AppClassNames & ClassNames<typeof Logo, LinkProps, typeof Body>
function AppComponent({classnames, classnames: {App}}: AppProps) {
  const classNaming = classNamingCtx({classnames})
  return (
    <div {...classNamingCtx({App})}>
      <Header {...classNaming({App_header: true})}>
        <Logo {...classNaming()} {...{classnames}}/>
        <Body/>
        <Link {...{...classNaming(), classnames}}/>
      </Header>
    </div>
  );
}

export default AppComponent;

type LinkProps = ClassNamesProperty<{"App-link": ClassHash}>
function Link({classnames: {"App-link": appLink}}: LinkProps) {
  return <a
    {...classNamingCtx<LinkProps["classnames"]>({"App-link": appLink})}
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>    
}
