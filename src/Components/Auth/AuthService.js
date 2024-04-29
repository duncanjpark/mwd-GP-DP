import Parse from "parse";

// check if current user is already authenticated
export const isAuthenticated = () => {
    return Parse.User.current()?.authenticated;
};

// Create a user when registering
export const createUser = (newUser) => {
    const user = new Parse.User();

    user.set("username", newUser.email);
    user.set("firstName", newUser.firstName);
    user.set("lastName", newUser.lastName);
    user.set("password", newUser.password);
    user.set("email", newUser.email);

    console.log("User: ", user);
    return user
        .signUp()
        .then((newUserSaved) => {
            return newUserSaved;
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
};

// Login a user
export const loginUser = (currentUser) => {
    const user = new Parse.User();

    user.set("password", currentUser.password);
    user.set("username", currentUser.email);

    return user
        .logIn(user.email, user.password)
        .then((currentUserSaved) => {
            return currentUserSaved;
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
};

// Logout a user
export const logoutUser = () => {
    return Parse.User.logOut()
        .then(() => {
            console.log("Logged out successfully");
        })
        .catch((error) => {
            alert(`Error during logout: ${error.message}`);
        });
};

