import React, {useEffect, useState} from "react";
import logo from './images/logoImage.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './MainScreen.css'
import axios from "axios";
import { PageTitle, MainTitle } from "./PageTitle";
import Footer from "./Footer";
import {Restaurants} from "../../server/src/model/restaurants"
import {response} from "express";

axios.defaults.withCredentials = true;

async function onClickedLike(id : number) {
    let sID : string = id.toString();
    const response = await axios.put("http://localhost:8080/user/" + sID, {operation : "like"});
    console.log(response.data);
}

async function onClickedDislike(id : number) {
    let sID : string = id.toString();
    const response = await axios.put("http://localhost:8080/user/" + sID, {operation : "dislike"});
    console.log(response.data);
}

function MainScreen(props : {
    goToCreateGroupPage : () => void;
    goToJoinGroupPage : () => void;
    goToMatchesPage : () => void;
}) {

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [images, setImages] = useState<string[]>([]);
    const [restaurants, setRestaurants] = useState<Restaurants[]>([]);
    const [showAlert, setShowAlert] = useState(false);

    // Shows an alert if there is no more restaurants to like/dislike
    async function areThereMoreRestaurants(){
        console.log("test")
        if (currentIndex >= restaurants.length - 1){
            setShowAlert(true);
        }
    }

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get<Array<Array<Restaurants>>>("http://localhost:8080/restaurant");

                let imageUrls : string[] = [];
                let restaurantArr : Restaurants[] = [];
                for (let i = 0; i < response.data.length; i++){
                    restaurantArr[i] = response.data[i][1];
                    imageUrls[i] = response.data[i][1].imageUrl;
                }
                setImages(imageUrls);
                setRestaurants(restaurantArr);
                console.log(restaurants);
                console.log(imageUrls);
            } catch (error){
                console.error(error);
            }
        }
        fetchImages();
    }, []);

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
                            {!showAlert && (
                                <img src={images[currentIndex]} className="food-image" alt="food-image"/>
                            )}
                            {showAlert && (
                                <div className="alert alert-warning" role="alert">
                                    There are no more restaurants!
                                </div>
                            )}

                        </div>
                        <div className="card-footer">
                            <button onClick={e => {e.preventDefault(); areThereMoreRestaurants(); onClickedLike(restaurants[currentIndex].id); setCurrentIndex(currentIndex+1);}} type="submit" id="Like" className="btn btn-outline-success custom-like-button">
                                Like
                            </button>
                            <button onClick={e => {e.preventDefault(); areThereMoreRestaurants(); onClickedDislike(restaurants[currentIndex].id); setCurrentIndex(currentIndex+1);}} type="submit" id="DisLike" className="btn btn-outline-danger custom-dislike-button">
                                Dislike
                            </button>
                        </div>
                        <div className="bottom-buttons">
                            <button onClick={e => {e.preventDefault(); props.goToCreateGroupPage();}} id="create-group" className="btn btn-info btn-block create-button">
                                Create Group
                            </button>
                            <button onClick={e => {e.preventDefault(); props.goToJoinGroupPage();}} id="join-group" className="btn btn-info btn-block join-group-button">
                                Join Group
                            </button>
                            <button onClick={e => {e.preventDefault(); props.goToMatchesPage();}} id="join-group" className="btn btn-info btn-block join-group-button">
                                Matches
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