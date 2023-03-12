import express, { Request, Response } from "express";
import { Restaurants } from "../model/restaurants";
import {makeRestaurantService} from "../db/service/restaurant.service";
import {User} from "../model/user";
import {Group} from "../model/group";
import {apiService, groupService} from "./group.router";
import {RestaurantDetails} from "../api/restaurantDetails";

export const restaurantService = makeRestaurantService()   // For using service layer functions
export const restaurantRouter = express.Router()

/* -------------- Test Set [R] -------------
console.log("Inputting Restaurant Test Set ------------------------->");
restaurantService.createRestaurant("0", "a", "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
restaurantService.createRestaurant("1", "b", "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
restaurantService.createRestaurant("2", "c", "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
restaurantService.createRestaurant("3", "d", "https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
console.log(restaurantService.getRestaurants());
/* --------------------------------------*/


// GET handlers

restaurantRouter.get("/", async (
    req: Request<{}, {}, {}> & {
        session : {user ?: User}}, // session : {user ?: User, group ?: Group}},
    res: Response< Map<string, Restaurants> | string>
) => {

    try {
        console.log(req.session.user);
        // Check session to see if user is logged in
        if (req.session.user == null) {
            res.status(401).send("Not logged in");
            return;
        }

        // Get & Send all restaurants
        //const restaurants = await restaurantService.getRestaurants();
        const restaurants : Array<Restaurants> = await groupService.getRestaurantsForUser(req.session.user);
        res.status(200).send(JSON.stringify([...restaurants]));
        console.log(restaurants);
    } catch (e : any) {
        console.log(e);
        res.status(500).send(e.message);
    }

});


restaurantRouter.get("/:rid", async (
    req: Request<{rid : string }, {}, {}> & {
        session : {user ?: User}},
    res: Response< RestaurantDetails| string >
) => {
    try {
        console.log(req.session.user);
        // Check session to see if user is logged in
        if (req.session.user == null) {
            res.status(401).send("Not logged in");
            return;
        }

        // Check id for null
        if (req.params.rid == null ) {
            res.status(400).send("Faulty call! Index is null");
            return;
        }

        if (typeof (req.params.rid) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- rid has type
            ${typeof (req.params.rid)}`);
            return;
        }
        const id : string = req.params.rid;


        // Get & Send found restaurant
        const found = await restaurantService.checkRestaurant(id)
        if (!found) {
            res.status(404).send("Can't find the restaurant for the given index!");
            return;
        }

        const details = await apiService.getRestaurantDetails(id);
        if (details == null) {
            res.status(404).send("Yelp Api returned null");
            return;
        }
        res.status(200).send(details);
        console.log(details);

        return;

    } catch (e : any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});

