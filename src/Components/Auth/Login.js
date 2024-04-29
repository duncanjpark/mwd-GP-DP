import React, { useEffect, useState } from "react";
import { isAuthenticated, loginUser } from "./AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    // redirect already authenticated users back to home
    const [currentUser, setCurrentUser] = useState({
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

    const onChangeHandler = (e) => {
        e.preventDefault();
        console.log(e.target);
        const { name, value: newValue } = e.target;
        console.log(newValue);

        setCurrentUser({ ...currentUser, [name]: newValue });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log("submitted: ", e.target);
        setAdd(true);
    };

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
