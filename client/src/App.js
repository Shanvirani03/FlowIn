import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { createContext, useEffect, useReducer, useContext } from "react";
import { initalState, reducer } from "./reducers/userReducer.js";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import OtherUsers from "./pages/OtherUsers"
import Navbar from "./components/navbar";
import BeatStore from "./pages/Beats";


export const userContext = createContext();

const Routing = () => {

  const history = useNavigate();
  const { state, dispatch } = useContext(userContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user) {
      dispatch({ type: "USER", payload: user})
      // history('/Profile')
    } else {
      // history('/Login')
    }
  }, [])

  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/Registration" element={<Registration />} />
    <Route exact path="/Profile" element={<Profile />} />
    <Route path="/Profile/:userId" element={<OtherUsers />} />
    <Route path="/Post/:postId" element={<Post />} />
    <Route path="/Beats" element={<BeatStore />} />
    </Routes>
  )
}


function App() {

  const [state, dispatch] = useReducer(reducer, initalState)

  return (
    <userContext.Provider value={{state, dispatch}}>
      <Router> 
        <Navbar />
        <Routing />
      </Router>
    </userContext.Provider>

  );
}

export default App;
