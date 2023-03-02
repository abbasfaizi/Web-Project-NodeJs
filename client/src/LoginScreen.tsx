import React, { useState } from "react";
import axios from 'axios';
import logo from './images/logoImage.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './LoginScreen.css';
import { PageTitle, MainTitle } from "./PageTitle";
import Footer from "./Footer";
axios.defaults.withCredentials = true;


async function clickedLogin(username : string, password : string, props: () => void) {
  const response = await axios.post("http://localhost:8080/user/login", {
    "userid": username,
    "password": password
  });
  console.log(response.data);

  if (response.status == 200){
    props();
  }

}


function Login(props : {
  goToRegisterPage : () => void
  goToMainPage : () => void
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('/api/login', {
        username: username,
        password: password
      }
      );
      
      // Redirect to the main page
      window.location.href = '/main';
    } catch (error) {
      setError('Invalid username or password');
    }
  }


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-header">
              <img src={logo} className="Web-Logo" alt="Logo" />
              <PageTitle title="Please Login" />
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="username-group">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    className="username-control"
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="password-control"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" id="login" className="btn btn-primary btn-block" onClick={() => clickedLogin(username, password, props.goToMainPage)}>
                  Login
                </button>
              </form>
            </div>
            <div className="card-footer">
              <p className="text-center">
                Don't have an account?{" "}
                <a href="" onClick={e => {
                  e.preventDefault();
                  props.goToRegisterPage();
                }}>Create account</a>
              </p>
            </div>
          </div>
         
          <button onClick={e => {e.preventDefault(); props.goToMainPage();}} className="btn btn-secondary btn-block">
            Main page
          </button>
        </div>
        
      </div>
      <div>
                       
                            <Footer year={2023} companyName="FoodMatcher.se"/>
                        
      </div>
    </div>
  );
};

export default Login;
