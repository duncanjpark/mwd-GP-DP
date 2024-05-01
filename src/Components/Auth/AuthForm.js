import React from "react";
import Button from 'react-bootstrap/Button';

const AuthForm = ({ user, loginPage, onChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} autoComplete="off" className="auth-form">
            {/* Use conditional to render either login or register */}
            {
                !loginPage && (
                    <div>
                        <div className="mt-3">
                            <label>First Name</label>
                            <br />
                            <input
                                type="text"
                                value={user.firstName}
                                onChange={onChange}
                                name="firstName"
                                placeholder="First Name"
                                required
                            />
                        </div>
                        <div className="mt-3">
                            <label>Last Name</label>
                            <br />
                            <input
                                type="text"
                                value={user.lastName}
                                onChange={onChange}
                                name="lastName"
                                placeholder="Last Name"
                                required
                            />
                        </div>{" "}
                    </div>
                )
            // If loginPage, just render the following
            }
            <div>
                <div className="mt-3">
                    <label>Email</label>
                    <br />
                    <input
                        type="email"
                        value={user.email}
                        onChange={onChange}
                        name="email"
                        placeholder="Email"
                        required
                    />
                </div>{" "}
                <div className="mt-3">
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        value={user.password}
                        onChange={onChange}
                        name="password"
                        placeholder="Password"
                        min="0"
                        required
                    />
                </div>
                <div>
                    <Button type="submit" onSubmit={onSubmit} className="mt-3">
                        Submit
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default AuthForm;