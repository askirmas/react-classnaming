import React, { PropsWithChildren } from 'react';
import logo from './logo.svg';
import type { ClassNames, ClassNamesProperty, ClassHash} from "react-classnaming"
import classNaming from "react-classnaming"

const Header = ({className, children}: PropsWithChildren<ClassNames<true>>) =>
  <header {...{className}}>{children}</header>;

const Logo = (props: ClassNames<true, ClassNamesProperty<{"App-logo": ClassHash}>>) => {
  const classes = classNaming(props)
  return <img src={logo} {...classes({"App-logo": true})} alt="logo" />
}

const Body = () => <p>Edit <code>src/App.tsx</code> and save to reload.</p>

type AppClassNames = ClassNamesProperty<{
  App: ClassHash
  App_header: ClassHash
}>
type AppProps = AppClassNames & ClassNames<typeof Logo, LinkProps, typeof Body>
function AppComponent({classnames, classnames: {App}}: AppProps) {
  const classes = classNaming({classnames})
  return (
    <div {...classes({App})}>
      <Header {...classes({App_header: true})}>
        <Logo {...classes()} {...{classnames}}/>
        <Body/>
        <Link {...{...classes(), classnames}}/>
      </Header>
    </div>
  );
}

export default AppComponent;

type LinkProps = ClassNamesProperty<{"App-link": ClassHash}>
function Link({classnames: {"App-link": appLink}}: LinkProps) {
  return <a
    {...classNaming<LinkProps>()({"App-link": appLink})}
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>    
}
