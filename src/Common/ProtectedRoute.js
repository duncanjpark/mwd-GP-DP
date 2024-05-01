import React from "react";
import { isAuthenticated } from "../Components/Auth/AuthService";
import Landing from "../Components/Landing/Landing";

const ProtectedRoute = ({ element: Component, ...rest }) => {

    return (
        <div>
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