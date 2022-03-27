import { Routes, Route } from "react-router-dom";
import "./styles/global.scss";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { Private } from "./routes/Private";
import Dashboard from "./components/dashboard";
import Profile from "./components/profile";
import Authenticate from "./components/authenticate";
import Home from "./Home";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <Private>
              <Dashboard />
            </Private>
          }
        />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route
          path="/profile"
          element={
            <Private>
              <Profile />
            </Private>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
