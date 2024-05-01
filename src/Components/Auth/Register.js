import React, { useEffect, useState } from "react";
import { createUser, isAuthenticated } from "./AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    // State to hold the new user's registration information
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    // State to manage registration submission status
    const [add, setAdd] = useState(false);

    // Effect to redirect authenticated users to home
    useEffect(() => {
        if (isAuthenticated()) {
            alert("You are already logged in");
            navigate("/");
        }
    }, [navigate]);

    // Effect to handle the user registration process
    useEffect(() => {
        if (newUser && add) {
            createUser(newUser).then((userCreated) => {
                if (userCreated) {
                    alert(
                        `${userCreated.get("firstName")}, you successfully registered!`
                    );
                    navigate("/");
                }
                setAdd(false);
            });
        }
    }, [navigate, newUser, add]);

    // Handler for changes in form fields, updates newUser state
    const onChangeHandler = (e) => {
        e.preventDefault();
        const { name, value: newValue } = e.target;
        setNewUser({ ...newUser, [name]: newValue });
    };

    // Handler for form submission, triggers registration process
    const onSubmitHandler = (e) => {
        e.preventDefault();
        setAdd(true);
    };

    // Render the AuthForm component with user data and event handlers
    return (
        <div>
            <AuthForm
                user={newUser}
                onChange={onChangeHandler}
                onSubmit={onSubmitHandler}
            />
        </div>
    );
};

export default Register;