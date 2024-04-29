import Main from "./Main/Main";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import About from "./About/About";
import Auth from "./Auth/Auth";
import ProtectedRoute from "../Common/ProtectedRoute";
import NavBar from "./NavBar/NavBar";
import NewSession from "./Main/Workouts/NewSession";

// Import React Router components for navigation and routing.
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

export default function Components() {
    return (
        <Router>
            <NavBar></NavBar>
            <Routes>
                {/* Define the app's routes and their corresponding components. */}
                <Route path="/about" element={<About />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                {/* Use a protected route to access the Main page */}
                <Route
                    path="/"
                    element={<ProtectedRoute path="/" element={Main} />}
                />
                <Route
                    path="/new-session"
                    element={<ProtectedRoute path="/" element={NewSession} />}
                />
                <Route
                    path="/previous-sessions"
                    element={<ProtectedRoute path="/" element={Main} />}
                />
                <Route path="*" element={<Navigate to="/auth" replace />} />
            </Routes>
        </Router>
    );
}