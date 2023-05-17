import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import LandingPage from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import OtherUsers from "./pages/OtherUsers"
import { useParams } from "react-router-dom";


function App() {

  const { userId } = useParams()

  return (
    <div className="App">
        <Router> 
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Registration" element={<Registration />} />
            <Route exact path="/Profile" element={<Profile />} />
            <Route path="/Profile/:userId" element={<OtherUsers />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
