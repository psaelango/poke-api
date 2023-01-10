import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h2 className="text-2xl">Altrio front-end test w/ React</h2>
      <h3 className="mt-4">
        Read the instructions in the README.md to start your test
      </h3>
    </div>
  );
}

export default App;
