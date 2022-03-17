import { Reset } from "styled-reset";
import "./App.css";
import ConvertToHTML from "./component/ConvertToHTML";
import Header from "./component/Header";

function App() {
  return (
    <div className="App">
      <Reset />
      <Header />
      <ConvertToHTML />
    </div>
  );
}

export default App;
