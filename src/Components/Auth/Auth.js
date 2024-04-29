import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "./AuthService";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Auth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // if already authenticated send users back to home
        if (isAuthenticated()) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="auth">
            <Link to="/register">
                <Button className="mb-5" style={{ minWidth: '200px' }}>Register</Button>
            </Link>
            <Link to="/login">
                <Button style={{ minWidth: '200px' }}>Login</Button>
            </Link>
        </div>
    );
};

export default Auth;
