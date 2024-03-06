import Main from "./Main/Main";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import About from "./About/About";
// Import React Router components for navigation and routing.
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Components() {
  return (
    <Router>
      <Routes>
        {/* Define the app's routes and their corresponding components. */}
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
