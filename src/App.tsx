import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CharacterList } from "./Pages/characterList";
import { CharacterDetail } from "./Pages/characterDetail";
import "./App.css";

function App() {
  return (
    <div className="app-bg">
      <Router>
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

