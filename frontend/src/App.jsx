import Login from "./sections/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./sections/SignUp";
import Hero from "./sections/Hero";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Hero />} />
          <Route path="/dashboard" element={<Hero />} />
          <Route path="/courses" element={<Hero />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
