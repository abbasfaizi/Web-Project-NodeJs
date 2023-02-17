import React from "react";
import logo from './images/logoImage.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './LoginScreen.css'

const Login: React.FC = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-header">
                            <img src={logo} className="Web-Logo" alt="Logo" />
                        </div>
                        <div className="card-body">
                            <form id="login-form">
                                <div className="username-group">
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        className="username-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        className="password-control"
                                        required
                                    />
                                </div>
                                <button type="submit" id="login" className="btn btn-primary btn-block">
                                    Login
                                </button>
                            </form>
                        </div>
                        <div className="card-footer">
                            <p className="text-center">
                                Don't have an account?{" "}
                                <a href="./createaccount.html">Create account</a>
                            </p>
                        </div>
                    </div>
                    <p className="text-center mt-3">Click on the button below to navigate back to the main page.</p>
                    <button onClick={() => (document.location = "MainPage.tsx")} className="btn btn-secondary btn-block">
                        Main page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;