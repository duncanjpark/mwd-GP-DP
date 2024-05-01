import React, { useEffect, useState } from "react";
import { isAuthenticated, loginUser } from "./AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    // State to hold the current user's credentials
    const [currentUser, setCurrentUser] = useState({
        email: "",
        password: "",
    });

    // State to manage login submission status
    const [add, setAdd] = useState(false);

    // Effect to redirect authenticated users to home
    useEffect(() => {
        if (isAuthenticated()) {
            alert("You are already logged in");
            navigate("/");
        }
    }, [navigate]);

    // Effect to handle the login process
    useEffect(() => {
        if (currentUser && add) {
            loginUser(currentUser).then((userLoggedIn) => {
                if (userLoggedIn) {
                    alert(
                        `${userLoggedIn.get("firstName")}, you successfully logged in!`
                    );
                    navigate("/");
                }
                setAdd(false);
            });
        }
    }, [navigate, currentUser, add]);

    // Handler for form changes, updates state with form data
    const onChangeHandler = (e) => {
        e.preventDefault();
        const { name, value: newValue } = e.target;
        setCurrentUser({ ...currentUser, [name]: newValue });
    };

    // Handler for form submission, triggers login process
    const onSubmitHandler = (e) => {
        e.preventDefault();
        setAdd(true);
    };

    // Render the authentication form with handlers
    return (
        <div>
            <AuthForm
                user={currentUser}
                loginPage={true}
                onChange={onChangeHandler}
                onSubmit={onSubmitHandler}
            />
        </div>
    );
};

export default Login;