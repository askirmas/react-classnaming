import AppClassNames from './App.module.css';

const {App__container, App__header, App__link} = AppClassNames

function App() {
  return (
    <div className={App__container}>
      <header className={App__header}>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={App__link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
