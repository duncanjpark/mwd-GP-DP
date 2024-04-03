import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "./AuthService";
import { useNavigate } from "react-router-dom";

const Auth = () => {
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
    </div>
  );
};

export default Auth;
