import React, {useEffect, useState} from "react";
import logo from './images/logoImage.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './MainScreen.css'
import axios from "axios";
import {MainTitle } from "./PageTitle";
import Footer from "./Footer";
import {Restaurants} from "../../server/src/model/restaurants"

axios.defaults.withCredentials = true;

// Sends the likes restaurant to the backend
async function onClickedLike(id : string) {
    const response = await axios.put("http://localhost:8080/user/" + id, {operation : "like"});
}

// Sends the disliked restaurant to the backend
async function onClickedDislike(id : string) {
    const response = await axios.put("http://localhost:8080/user/" + id, {operation : "dislike"});
}

function MainScreen(props : {
    goToCreateGroupPage : () => void;
    goToJoinGroupPage : () => void;
    goToMatchesPage : () => void;
}) {

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [images, setImages] = useState<string[]>([]);
    const [restaurants, setRestaurants] = useState<Restaurants[]>([]);
    const [restaurantsLoaded, setRestaurantsLoaded] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    // Shows an alert if there is no more restaurants to like/dislike
    async function areThereMoreRestaurants(){
        if (currentIndex >= restaurants.length - 1){
            setRestaurantsLoaded(false);
            setShowAlert(true);
        }
    }

    // Gets the restaurants and its images from an API call to the backend and stores it
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get<Map<String, Restaurants>>("http://localhost:8080/restaurant");

                let restaurantArr : Restaurants[] = [];
                let imageUrls : string[] = [];
                response.data.forEach(function(value : Restaurants, key : String) {
                    restaurantArr.push(value);
                    imageUrls.push(value.imageUrl);
                })
                setRestaurants(restaurantArr);
                setImages(imageUrls);
                if (restaurants.length > 0){
                    setShowAlert(false);
                    setRestaurantsLoaded(true);
                } else {
                    //setShowAlert(true);
                }
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
                                <img src={images[currentIndex]} className="food-image" alt="food"/>
                            )}
                            {showAlert && (
                                <div className="alert alert-warning" role="alert">
                                    There are no more restaurants!
                                </div>
                            )}
                            {restaurantsLoaded && (<p className={"restaurant-name"}>{restaurants[currentIndex].name}</p>)}

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