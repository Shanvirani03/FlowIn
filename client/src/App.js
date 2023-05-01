import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import LandingPage from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";


function App() {
  return (
    <div className="App">
        <Router> 
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Registration" element={<Registration />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
