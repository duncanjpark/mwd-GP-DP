import React from "react";
// import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Components/Auth/AuthService";
import MainUnauth from "../Components/Main/MainUnauth";

const ProtectedRoute = ({ element: Component, ...rest }) => {
//   const navigate = useNavigate();
//   const goBackHandler = () => {
//     navigate("/auth");
//   };

  return (
    <div>
      {isAuthenticated() ? (
        <Component />
      ) : (
        <div>
            {/* If the user is unauthenticated, display the limited main page */}
            <MainUnauth />
        </div>
      )}
    </div>
  );
};

export default ProtectedRoute;
