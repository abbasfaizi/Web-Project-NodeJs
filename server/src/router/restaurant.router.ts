import express, { Request, Response } from "express";
import { makeRestaurantService } from "../service/restaurant.service";
import { Restaurants } from "../model/restaurants";

export const restaurantService = makeRestaurantService()   // For using service layer functions
export const restaurantRouter = express.Router()

/* -------------- Test Set [R] ------------- */
console.log("Inputting Restaurant Test Set ------------------------->");
restaurantService.addRestaurant(new Restaurants(0, "a", ""));
restaurantService.addRestaurant(new Restaurants(1, "b", ""));
restaurantService.addRestaurant(new Restaurants(2, "c", ""));
restaurantService.addRestaurant(new Restaurants(3, "d", ""));
console.log(restaurantService.getRestaurants());
/* --------------------------------------*/


// GET handlers

restaurantRouter.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response< Map<number, Restaurants> | string>
) => {

    try {

        // Get & Send all restaurants
        const restaurants = await restaurantService.getRestaurants();
        res.status(200).send(JSON.stringify([...restaurants]));
        console.log(restaurants);
    } catch (e : any) {
        res.status(500).send(e.message);
    }

});


restaurantRouter.get("/:rid", async (
    req: Request<{rid : string }, {}, {}>,
    res: Response< Restaurants| string >
) => {
    try {

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
        res.status(500).send(e.message);
    }
});


// POST Handler
restaurantRouter.post("*", async (
    req: Request<{}, {}, {}>,
    res: Response<any>
) => {

    try {

        // TODO
        res.status(200).send("Welcome to the Restaurants Page!! [POST]");
    } catch (e : any) {
        res.status(500).send(e.message);
    }

});

// PUT Handler
restaurantRouter.put("*", async (
    req: Request<{}, {}, {}>,
    res: Response<any>
) => {

    try {
        // TODO
        res.status(200).send("Welcome to the Restaurants Page!! [PUT]");
    } catch (e : any) {
        res.status(500).send(e.message);
    }
});
