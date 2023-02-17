import React from "react";
import logo from './images/logoImage.png'

const Login: React.FC = () => {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Login</title>
        <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
    crossOrigin="anonymous"
    />
    <link rel="stylesheet" href="./main.css" />
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
    required
    />
    </p>
    <p>
    <input
        type="password"
    id="password"
    placeholder="Password"
    required
    />
    </p>
    <p>
    <input type="submit" id="login" value="Login" />
        </p>
        <p>
        Don't have an account?{" "}
    <a href="./createaccount.html">Create account</a>
    </p>
    </form>
    </div>
    <p> Click on the button below to navigate back to the main page.</p>
    <button onClick={() => (document.location = "index.html")}>
    Main page
    </button>
    <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
    crossOrigin="anonymous"
        ></script>
        </body>
        </html>
);
};

export default Login;