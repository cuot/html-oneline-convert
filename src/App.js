import { Reset } from "styled-reset";
import "./App.css";
import ConvertToHTML from "./component/ConvertToHTML";
import Header from "./component/Header";
import KeyBoradListener from "./hook/KeyBoradListener";

function App() {
  return (
    <div className="App">
      <KeyBoradListener />
      <Reset />
      <Header />
      <ConvertToHTML />
    </div>
  );
}

export default App;
