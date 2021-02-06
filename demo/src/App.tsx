import classNaming from "react-classnaming"
import AppClassNames from './App.module.css';

const {App__container, App__header, App__link} = AppClassNames

function App() {
  return (
    <div {...classNaming({App__container})}>
      <header className={classNaming<string>({App__header})}>
        <a {...{
          ...classNaming({App__link}),
          "href": "https://reactjs.org",
          "target": "_blank",
          "rel": "noopener noreferrer",
        }}>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
