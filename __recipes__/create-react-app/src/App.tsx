import React, { PropsWithChildren } from 'react';
import logo from './logo.svg';
import type { ClassNames, ClassNamesProperty, ClassValue} from "react-classnaming"
import { classNamingBasic, classNamingCtx } from "react-classnaming"

const Header = ({className, children}: PropsWithChildren<ClassNames<true>>) =>
  <header {...{className}}>{children}</header>;

const Logo = (props: ClassNames<true, ClassNamesProperty<{"App-logo": ClassValue}>>) => {
  const classNaming = classNamingCtx(props)
  return <img src={logo} {...classNaming({"App-logo": true})} alt="logo" />
}

const Body = () => <p>Edit <code>src/App.tsx</code> and save to reload.</p>

type AppClassNames = ClassNamesProperty<{
  App: ClassValue
  App_header: ClassValue
}>
type AppProps = AppClassNames & ClassNames<typeof Logo, LinkProps, typeof Body>
function AppComponent({classnames, classnames: {App}}: AppProps) {
  const classNaming = classNamingCtx({classnames})
  return (
    <div {...classNamingBasic({App})}>
      <Header {...classNaming({App_header: true})}>
        <Logo {...classNaming()} {...{classnames}}/>
        <Body/>
        <Link {...{...classNaming(), classnames}}/>
      </Header>
    </div>
  );
}

export default AppComponent;

type LinkProps = ClassNamesProperty<{"App-link": ClassValue}>
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
