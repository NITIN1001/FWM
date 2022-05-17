import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import logo from "./logo.png";
import Home from "./Pages/Home";
import { AuthProvider } from "./context/AuthContext";
import Assign from "./Pages/Assign";
import Assigned from "./Pages/Assigned";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path="/assign" element={<Assign />}></Route>
          <Route exact path="/assigned" element={<Assigned />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
