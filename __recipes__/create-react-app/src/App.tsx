import React, { PropsWithChildren } from 'react';
import logo from './logo.svg';

function App({className}: {className: string}) {
  return (
    <div className={className}>
      <Header className="App-header">
        <Logo className="App-logo"/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Link className="App-link"/>
      </Header>
    </div>
  );
}

export default App;

function Header({className, children}: PropsWithChildren<{className: string}>) {
  return <header className={className}>{children}</header> 
}

function Logo({className}: {className: string}) {
  return <img src={logo} className={className} alt="logo" />
}

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