import React from "react";
import { isAuthenticated } from "../Components/Auth/AuthService";
import Auth from "../Components/Auth/Auth";
import Landing from "../Components/Main/Landing";

const ProtectedRoute = ({ element: Component, ...rest }) => {

  return (
    <div>
      {isAuthenticated() ? (
        <Component />
      ) : (
        <div>
            {/* If the user is unauthenticated, display the limited main page */}
            <Landing />
        </div>
      )}
    </div>
  );
};

export default ProtectedRoute;
