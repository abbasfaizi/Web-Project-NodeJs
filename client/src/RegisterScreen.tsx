import React, { useState } from "react";
import logo from './images/logoImage.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './RegisterScreen.css'
import { PageTitle, MainTitle } from "./PageTitle";
import Footer from "./Footer";
import axios from "axios";
axios.defaults.withCredentials = true;


// When pressing the register button it sends a register reqquest to the backend and if it is successfull it redirects to the login page
async function clickedRegister(username: string, password: string, props: () => void) {
  console.log(username, password);
  const response = await axios.post("http://localhost:8080/user/register", {
    "userid": username,
    "password": password
  });
  console.log(response.data);

  if(response.status == 201){
    props();
  }

}

function Register(props : {
  goToMainPage : () => void
  goToLoginPage : () => void
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [registrationError, setRegistrationError] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      setRegistrationError('Passwords do not match');
      return;
    }

    // Handle the registration logic here
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-header">
              <img src={logo} className="Web-Logo" alt="Logo" />
              <PageTitle title="Register now and get started" />
            </div>
            <div className="card-body">
              <form id="login-form" onSubmit={handleSubmit}>
                <div className="username-group">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    className="username-control"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="password-control"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="repeat-password"
                    placeholder="Repeat password"
                    className="repeat-password-control"
                    value={repeatPassword}
                    onChange={handleRepeatPasswordChange}
                    required
                  />
                </div>
                {registrationError && <div className="alert alert-danger">{registrationError}</div>}
                <button type="submit" id="register" className="btn btn-primary btn-block" onClick={() => clickedRegister(username, password, props.goToLoginPage)}>
                  Register
                </button>
              </form>
            </div>
            <div className="card-footer">
              <p className="text-center">
                Already have an account?{" "}
                <a href="">Login</a>
              </p>
            </div>
          </div>
          <button onClick={e => {e.preventDefault(); props.goToMainPage();}} className="btn btn-secondary btn-block">
            Main page
          </button>
        </div>
        <div>
                      
                            <Footer year={2023} companyName="FoodMatcher.se"/>
                      
                    </div>
      </div>
    </div>
  );
};

export default Register;
