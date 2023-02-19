import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import axios from "axios";
import {Restaurants} from "../../server/src/model/restaurants";
import CreateGroup from "./CreateGroup";


function App() {
    async function updateRestaurants() {
        const response = await axios.get<Restaurants[]>("http://localhost:8080/restaurant");
        console.log(response.data);
    }

    useEffect(() => {
        updateRestaurants();
    }, []);

  return (
    <div className="App">
      <CreateGroup/>
    </div>
  );
}

export default App;

/*
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.tsx</code> and save to reload.
  </p>
  <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
*/