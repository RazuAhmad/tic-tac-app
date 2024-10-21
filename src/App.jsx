import { useState } from "react";
import "./App.css";
import Game from "./components/Game/Game";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-7xl mx-auto">
      <Game />
    </div>
  );
}

export default App;
