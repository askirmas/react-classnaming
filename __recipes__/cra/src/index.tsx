import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppClassNames from './App.module.css';

const {App__container, App__header, App__link, NotExistent} = AppClassNames
, Redundant = undefined

ReactDOM.render(
  <React.StrictMode>
    {//@ts-expect-error Type '{ readonly [key: string]: string; }' is missing the following properties
      <App classNames={AppClassNames}/>
    }
    {//@ts-expect-error Property 'NotExistent' is missing
      <App classNames={{App__container, App__header, App__link}}/>
    }
    <App className="App" classNames={{App__container, App__header, App__link, NotExistent,
      //@ts-expect-error Object literal may only specify known properties, and 'Redundant' does not exist 
      Redundant
    }}/>
  </React.StrictMode>,
  document.getElementById('root')
);
