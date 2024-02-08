import Collage from "./components/Collage";
import imageURLs from "./data";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Collage imageURLs={imageURLs} />
    </div>
  );
}

export default App;
