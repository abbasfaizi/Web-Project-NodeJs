import express, { Request, Response } from "express";
import { Restaurants } from "../model/restaurants";
import {makeRestaurantService} from "../db/service/restaurant.service";
import {User} from "../model/user";
import {Group} from "../model/group";

export const restaurantService = makeRestaurantService()   // For using service layer functions
export const restaurantRouter = express.Router()

/* -------------- Test Set [R] ------------- */
console.log("Inputting Restaurant Test Set ------------------------->");
restaurantService.createRestaurant(0, "a", "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
restaurantService.createRestaurant(1, "b", "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
restaurantService.createRestaurant(2, "c", "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
restaurantService.createRestaurant(3, "d", "https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
console.log(restaurantService.getRestaurants());
/* --------------------------------------*/


// GET handlers

restaurantRouter.get("/", async (
    req: Request<{}, {}, {}> & {
        session : {user ?: User}}, // session : {user ?: User, group ?: Group}},
    res: Response< Map<number, Restaurants> | string>
) => {

    try {
        console.log(req.session.user);
        // Check session to see if user is logged in
        if (req.session.user == null) {
            res.status(401).send("Not logged in");
            return;
        }

        /*
        if (req.session.group == null) {
            res.status(401).send("Not in a group");
            return;
        }
         */

        // Get & Send all restaurants
        const restaurants = await restaurantService.getRestaurants();
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
    res: Response< Restaurants| string >
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

        // Parse & Check id for bound
        const id = parseInt(req.params.rid, 10);
        if (!(id >= 0)) {
            res.status(400).send("Index out of bound! Must be equal to or greater than 0")
            return;
        }

        // Get & Send found restaurant
        const found = await restaurantService.checkRestaurant(id)
        if (!found) {
            res.status(404).send("Can't find the restaurant for the given index!");
            return;
        }

        const restaurant = await restaurantService.getRestaurant(id);
        res.status(200).send(restaurant);
        console.log(restaurant);

        return;

    } catch (e : any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});


// POST Handler
restaurantRouter.post("*", async (
    req: Request<{}, {}, {}> & {
        session : {user ?: User}},
    res: Response<any>
) => {

    try {
        console.log(req.session.user);
        // Check session to see if user is logged in
        if (req.session.user == null) {
            res.status(401).send("Not logged in");
            return;
        }

        // TODO
        res.status(200).send("Welcome to the Restaurants Page!! [POST]");
    } catch (e : any) {
        console.log(e);
        res.status(500).send(e.message);
    }

});

// PUT Handler
restaurantRouter.put("*", async (
    req: Request<{}, {}, {}> & {
        session : {user ?: User}},
    res: Response<any>
) => {

    try {
        console.log(req.session.user);
        // Check session to see if user is logged in
        if (req.session.user == null) {
            res.status(401).send("Not logged in");
            return;
        }

        // TODO
        res.status(200).send("Welcome to the Restaurants Page!! [PUT]");
    } catch (e : any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});
