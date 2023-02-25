import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import axios from "axios";
import {Restaurants} from "../../server/src/model/restaurants";
import CreateGroup from "./CreateGroup";
import MainScreen from "./MainScreen";


enum Page {
    LOGIN,
    REGISTER,
    CREATEGROUP,
    MAIN,
    ERROR
}

async function updateRestaurants() {
    const response = await axios.get<Restaurants[]>("http://localhost:8080/restaurant");
    console.log(response.data);
}

function ErrorPage(){
    return <p><strong>Server Error: Something went wrong</strong></p>
}

function App() {

    useEffect(() => {
        updateRestaurants();
    }, []);

    const [page, setPage] = useState<Page>(Page.LOGIN);

    switch (page) {
        case Page.LOGIN:
            return <LoginScreen
            goToRegisterPage={() =>{
                setPage(Page.REGISTER)
            }}
            goToMainPage={() =>{
                setPage(Page.MAIN)
            }}
            />;
        case Page.REGISTER:
            return <RegisterScreen
            goToMainPage={() => {setPage(Page.MAIN)
            }}
            />;
        case Page.CREATEGROUP:
            return <CreateGroup/>;
        case Page.MAIN:
            return <MainScreen/>;
        case Page.ERROR:
            return <ErrorPage/>
    }

  return (
        <div className="App">
        </div>
  );
}

export default App;
