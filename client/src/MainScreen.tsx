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
    // response.data[0].imageUrl;

    if(response.status == 200){
        return response.data;
    }
}

interface Matrix {
    rows: number[][];
}

function MainScreen(props : {
    goToCreateGroupPage : () => void;
    goToJoinGroupPage : () => void;
}) {

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get<Array<Array<Restaurants>>>("http://localhost:8080/restaurant");

                let imageUrls : string[] = [];
                for (let i = 0; i < response.data.length; i++){
                    imageUrls[i] = response.data[i][1].imageUrl;
                    console.log(response.data[i][1].imageUrl);
                }
                setImages(imageUrls);
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