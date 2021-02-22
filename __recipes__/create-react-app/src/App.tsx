import React, { PropsWithChildren } from 'react';
import logo from './logo.svg';

const Header = ({className, children}: PropsWithChildren<{className: string}>) => <header
  className={className}>{children}
</header> 

const Logo = ({className}: {className: string}) => <img src={logo} className={className} alt="logo" />

const Body = () => <p>Edit <code>src/App.tsx</code> and save to reload.</p>

function App({className}: {className: string}) {
  return (
    <div className={className}>
      <Header className="App-header">
        <Logo className="App-logo"/>
        <Body/>
        <Link className="App-link"/>
      </Header>
    </div>
  );
}

export default App;

function Link({className}: {className: string}) {
  return <a
    className={className}
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>    
}
