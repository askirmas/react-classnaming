import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CssClassNames from './App.module.css';
import {classNamesCheck} from "react-classnaming"

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

    <App className="App" classNames={classNamesCheck()}/>

    {//@ts-expect-error is missing the following properties
      <App className="App" classNames={classNamesCheck<"">()}/>
    }

    {/*TODO Check redundant props via
        <Root classNames={classNameCheck<typeof Root>(classNames)} />;
    */}
  </React.StrictMode>,
  document.getElementById('root')
);
