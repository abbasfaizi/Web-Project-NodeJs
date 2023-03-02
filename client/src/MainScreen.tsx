import React, {useState} from "react";
import logo from './images/logoImage.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './MainScreen.css'
import axios from "axios";
import { PageTitle, MainTitle } from "./PageTitle";
import Footer from "./Footer";
import {Restaurants} from "../../server/src/model/restaurants"
axios.defaults.withCredentials = true;

async function onClickedLike() {
    const response = await axios.put("http://localhost:8080/user/0/0", {operation : "like"});
    console.log(response.data);
}

async function onClickedDislike() {
    const response = await axios.put("http://localhost:8080/user/0/0", {operation : "dislike"});
    console.log(response.data);
}

async function fetchRestaurants(){
    const response = await axios.get<Array<Restaurants>>("http://localhost:8080/restaurant");
    console.log(response);

    if(response.status == 200){
        const test = response.data[1].imageUrl;
        console.log(test);

        /*let restaurants_arr : Restaurants = response.data;

        console.log(restaurants_arr);
        console.log(restaurants_arr.imageUrl);
        return restaurants_arr; */
    }

}

function MainScreen(props : {
    goToCreateGroupPage : () => void;
    goToJoinGroupPage : () => void;
}) {
    fetchRestaurants();

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [images, setImages] = useState<string[]>([
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ]);

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
                            <img src={images[currentIndex]} className="food-image" alt="food-image" />

                        </div>
                        <div className="card-footer">
                            <button onClick={e => {e.preventDefault(); onClickedLike(); setCurrentIndex(currentIndex+1);}} type="submit" id="Like" className="btn btn-outline-success custom-like-button">
                                Like
                            </button>
                            <button onClick={e => {e.preventDefault(); onClickedDislike(); setCurrentIndex(currentIndex+1)}} type="submit" id="DisLike" className="btn btn-outline-danger custom-dislike-button">
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