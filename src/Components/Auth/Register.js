import React, { useEffect, useState } from "react";
import { createUser, isAuthenticated } from "./AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    // flag is the state to watch for add/remove updates
    const [add, setAdd] = useState(false);

    // redirect already authenticated users back to home
    useEffect(() => {
        if (isAuthenticated()) {
            alert("You are already logged in");
            navigate("/");
        }
    }, [navigate]);

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

    const onChangeHandler = (e) => {
        e.preventDefault();
        console.log(e.target);
        const { name, value: newValue } = e.target;
        console.log(newValue);
        setNewUser({ ...newUser, [name]: newValue });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log("submitted: ", e.target);
        setAdd(true);
    };

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
