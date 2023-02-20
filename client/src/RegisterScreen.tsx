import React from "react";
import logo from './images/logoImage.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './RegisterScreen.css'
import PageTitle from './PageTitle';

const Register: React.FC = () => {
    return (
        <div className="container">
            
            <div className="row justify-content-center">
               <PageTitle title="Sign up for exclusive access to our services" />
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
                                <div className="form-group">
                                    <input
                                        type="password"
                                        id="repeat-password"
                                        placeholder="Repeat password"
                                        className="repeat-password-control"
                                        required
                                    />
                                </div>
                                <button type="submit" id="register" className="btn btn-primary btn-block">
                                    Register
                                </button>
                            </form>
                        </div>
                        <div className="card-footer">
                            <p className="text-center">
                                Already have an account?{" "}
                                <a href="./createaccount.html">Login</a>
                            </p>
                        </div>
                    </div>
                    <p className="text-center mt-3">Click on the button below to navigate back to the main page.</p>
                    <button onClick={() => (document.location = "index.html")} className="btn btn-secondary btn-block">
                        Main page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;