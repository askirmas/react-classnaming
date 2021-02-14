import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CssClassNames from './App.module.css';

const {App__Container, App__Content, Content, App__Header, Header, App__link, NotExistent} = CssClassNames
, AppClassNames = {App__Container, App__Content, Content, App__Header, Header, App__link, NotExistent}
, {Content: _, ...WithoutSomeClassName} = AppClassNames
, RedundantClassName = undefined

ReactDOM.render(
  <React.StrictMode>

    <App className="App" classNames={AppClassNames}/>

    {//@ts-expect-error Property is missing
      <App className="App" classNames={WithoutSomeClassName}/>
    }

    <App className="App" classNames={{...AppClassNames, 
      //@ts-expect-error Object literal may only specify known properties, and 'Redundant' does not exist 
      RedundantClassName
    }}/>
  </React.StrictMode>,
  document.getElementById('root')
);
