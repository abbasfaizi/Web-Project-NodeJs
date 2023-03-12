import logo from "./images/logoImage.png";
import React, {useState} from "react";
import './MatchesPage.css'
import {Restaurants} from "../../server/src/model/restaurants"
import axios from "axios";

function MatchesPage(props : {
    goToMainPage : () => void;
}){

    const [id, setId] = useState('');
    const [showRestaurant, setShowRestaurant] = useState(false);
    const [restaurantImage, setRestaurantImage] = useState("");


    async function clickedShow(id : string){
        const response = await axios.get("http://localhost:8080/group/" + id);
        if (response.status == 200){
            let restaurant : Restaurants = response.data;
            setRestaurantImage(restaurant.imageUrl);
            setShowRestaurant(true);
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-header">
                            <img src={logo} className="Web-Logo" alt="Logo" />
                        </div>
                        <div className="card-body">
                            <form id="group-form">
                                    <input
                                        type="text"
                                        id="group-name"
                                        name="group-name"
                                        placeholder="Group name"
                                        className="group-name-control"
                                        required
                                        value = {id}
                                        onChange={(event) => setId(event.target.value)}
                                    />
                            </form>
                        </div>
                        <button onClick={e => {e.preventDefault(); clickedShow(id)}} type="submit" id="show" className="btn btn-primary btn-block show-button">
                            Show
                        </button>
                        <div className="card-footer">
                        </div>
                        {showRestaurant && (
                            <div className="restaurant-image-control">
                                <img src={restaurantImage} className="restaurant-image" alt="restaurant-image" />
                            </div>
                        )}
                    </div>
                    <p className="text-center mt-3">Click on the button below to navigate back to the main page.</p>
                    <button onClick={e => {e.preventDefault(); props.goToMainPage()}} className="btn btn-secondary btn-block">
                        Main page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MatchesPage;