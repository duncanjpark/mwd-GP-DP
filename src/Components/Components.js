import Main from "./Main/Main";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import About from "./About/About";
import Auth from "./Auth/Auth";
import ProtectedRoute from "../Common/ProtectedRoute";
import NavBar from "./NavBar/NavBar";
import NewSession from "./Main/Workouts/NewSession";
import PreviousSessions from "./Main/Workouts/PreviousSessions";
import PreviousSessionDetails from "./Main/Workouts/PreviousSessionDetails";
import Workout from "./Main/Workouts/Workout";
import Analytics from "./Main/Workouts/Analytics";

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
                {/* Use a protected route to access the Main pages */}
                <Route
                    path="/"
                    element={<ProtectedRoute path="/" element={Main} />}
                />
                <Route
                    path="/new-session"
                    element={<ProtectedRoute path="/new-session" element={NewSession} />}
                />
                <Route
                    path="/previous-sessions"
                    element={<ProtectedRoute path="/previous-sessions" element={PreviousSessions} />}
                />
                <Route 
                    path="/previous-sessions/:sessionId" 
                    element={<ProtectedRoute path="/previous-sessions/:sessionId" element={PreviousSessionDetails} />} 
                />
                <Route
                    path="/workouts"
                    element={<ProtectedRoute path="/workouts" element={Workout} />}
                />
                <Route
                    path="/analytics"
                    element={<ProtectedRoute path="/analytics" element={Analytics} />}
                />
                <Route path="*" element={<Navigate to="/auth" replace />} />
            </Routes>
        </Router>
    );
}