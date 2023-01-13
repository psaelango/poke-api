import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import PokemonInfo from "./routes/PokemonInfo";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="pokemon">
        <Route path=":id" element={<PokemonInfo />} />
      </Route>
    </Routes>
  );
}

export default App;
