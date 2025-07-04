import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favourites";
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <div className="p-4">
        <nav className="mb-4 flex gap-4">
          <Link to="/" className="text-blue-500 hover:underline">Home</Link>
          <Link to="/favorites" className="text-blue-500 hover:underline">Favorites</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;