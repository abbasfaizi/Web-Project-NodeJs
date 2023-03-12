import React, {useState} from 'react';
import './App.css';
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import axios from "axios";
import {Restaurants} from "../../server/src/model/restaurants";
import CreateGroup from "./CreateGroup";
import JoinGroupPage from "./JoinGroupPage";
import MainScreen from "./MainScreen";
import MatchesPage from "./MatchesPage";
axios.defaults.withCredentials = true;


enum Page {
    LOGIN,
    REGISTER,
    CREATEGROUP,
    JOINGROUP,
    MATCHESPAGE,
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

   /* useEffect(() => {
        updateRestaurants();
    }, []);
    */

    const [page, setPage] = useState<Page>(Page.LOGIN);

    switch (page) {
        case Page.LOGIN:
            return <LoginScreen
                goToRegisterPage={() =>{setPage(Page.REGISTER)}}
                goToMainPage={() =>{setPage(Page.MAIN)}}
            />;
        case Page.REGISTER:
            return <RegisterScreen
                goToMainPage={() => {setPage(Page.MAIN)}}
                goToLoginPage={() => {setPage(Page.LOGIN)}}
            />;
        case Page.CREATEGROUP:
            return <CreateGroup
                goToMainPage={() => {setPage(Page.MAIN)}}
            />;
        case Page.JOINGROUP:
            return <JoinGroupPage
                goToMainPage={() => {setPage(Page.MAIN)}}
            />;
        case Page.MATCHESPAGE:
            return <MatchesPage goToMainPage={() => {setPage(Page.MAIN)}}
            />
        case Page.MAIN:
            return <MainScreen
                goToCreateGroupPage={() => {setPage(Page.CREATEGROUP)}}
                goToJoinGroupPage={() => {setPage(Page.JOINGROUP)}}
                goToMatchesPage={() => {setPage(Page.MATCHESPAGE)}}
            />;
        case Page.ERROR:
            return <ErrorPage/>
    }

  return (
        <div className="App">
        </div>
  );
}

export default App;
