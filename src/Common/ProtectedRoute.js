import React from "react";
import { isAuthenticated } from "../Components/Auth/AuthService"; // Import authentication check function
import Landing from "../Components/Landing/Landing"; // Import landing page component

// A higher-order component to conditionally render a component based on user authentication
const ProtectedRoute = ({ element: Component, ...rest }) => {

    return (
        <div>
            {/* If the user is authenticated, render the protected component */}
            {isAuthenticated() ? (
                <Component />
            ) : (
                <div>
                    {/* If the user is unauthenticated, display the landing page */}
                    <Landing />
                </div>
            )}
        </div>
    );
};

export default ProtectedRoute;
