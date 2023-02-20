import React, {useState} from "react";
import logo from './images/logoImage.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './MainScreen.css'
import axios from "axios";
import { PageTitle, MainTitle } from "./PageTitle";
import Footer from "./Footer";

const foods = ['./images/food1.PNG', './images/food2.JPG', './images/food3.JPG', './images/food4.JPG'];

const MainScreen: React.FC = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    async function onClickedLike() {
        const response = await axios.put("http://localhost:8080/user/0/0", {operation : "like"});
        console.log(response.data);
    }

    async function onClickedDislike() {
        const response = await axios.put("http://localhost:8080/user/0/0", {operation : "dislike"});
        console.log(response.data);
    }


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-header">
                            <img src={logo} className="Web-Logo" alt="Logo" />
                            <MainTitle title="Swipe your favorite food" />
                        </div>
                        <div className="card-body">
                            <img src={require('./images/food1.PNG')} className="food-image" alt="food-1" />

                        </div>
                        <div className="card-footer">
                            <button onClick={onClickedLike} type="submit" id="Like" className="btn btn-outline-success custom-like-button">
                                Like
                            </button>
                            <button onClick={onClickedDislike} type="submit" id="DisLike" className="btn btn-outline-danger custom-dislike-button">
                                Dislike
                            </button>
                        </div>
                    </div>
                    <div>
                        
                            <Footer year={2023} companyName="FoodMatcher.se"/>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default MainScreen;