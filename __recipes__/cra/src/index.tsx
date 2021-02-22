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

    <App className="App" classnames={AppClassNames}/>

    {//@ts-expect-error Property is missing
      <App className="App" classnames={WithoutSomeClassName}/>
    }

    <App className="App" classnames={{...AppClassNames, 
      //@ts-expect-error Object literal may only specify known properties, and 'Redundant' does not exist 
      RedundantClassName
    }}/>

    <App className="App" classnames={classNamesCheck()}/>

    {//@ts-expect-error is missing the following properties
      <App className="App" classnames={classNamesCheck<"">()}/>
    }

    {/*TODO Check redundant props via
        <Root classnames={classNameCheck<typeof Root>(classnames)} />;
    */}
  </React.StrictMode>,
  document.getElementById('root')
);
