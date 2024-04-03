import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "./AuthService";
import { useNavigate } from "react-router-dom";

const Auth = ({ showHomeButton = true } ) => {
  const navigate = useNavigate();

  useEffect(() => {
    // if already authenticated send users back to home
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <br />
      <br />
      <Link to="/login">
        <button>Login</button>
      </Link>
      <br />
      <br />
      {/* Show the home button if not already home */}
      {showHomeButton && (
        <button onClick={() => navigate("/")}>Home</button>
      )}
    </div>
  );
};

export default Auth;
