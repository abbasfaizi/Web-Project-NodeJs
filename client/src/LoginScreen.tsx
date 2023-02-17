import React from "react";
import logo from './images/logoImage.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './LoginScreen.css'

const Login: React.FC = () => {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Login</title>
        </head>
        <body>
        <div id="login-form-wrap">
            <form id="login-form">
                <div id="login-form-logooo">
                    <img src={logo} className={"Web-Logo"}  alt={"Logo"}/>
                </div>
                <p>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        className="form-control"
                        required
                    />
                </p>
                <p>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="form-control"
                        required
                    />
                </p>
                <p>
                    <input type="submit" id="login" value="Login" className="btn btn-primary" />
                </p>
                <p>
                    Don't have an account?{" "}
                    <a href="./createaccount.html">Create account</a>
                </p>
            </form>
        </div>
        <p> Click on the button below to navigate back to the main page.</p>
        <button onClick={() => (document.location = "index.html")} className="btn btn-secondary">
            Main page
        </button>
        </body>
        </html>
    );
};

export default Login;