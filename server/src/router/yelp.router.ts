import express, {Request, Response} from "express";
import {Restaurants} from "../model/restaurants";
import {makeYelpApiService} from "../api/yelp.api";
import {RestaurantDetails} from "../api/restaurantDetails";
export const yelpRouter = express.Router()

const KEY : string = "ZObVyWtKvwlGWl3TjzdECAEvJZ9OhcadjEsNFSKJn8Owmzed" +
    "P1qgyYij4Z1EKNAhlLBcOmYn-R1FJXOmK6du1IE7zyuV2kqHkCX4JPlaVn_liissZbddfdiSpXMLZHYx";

const apiService = makeYelpApiService(KEY);



// GET Handler
yelpRouter.get("/location/:location", async (
    req: Request<{location: string}, {}, {}>,
    res: Response<Restaurants[] | string>
) => {
    try {

        console.log(req.params.location);
        const restaurants = await apiService.getRestaurants(req.params.location);
        console.log(restaurants);
        res.status(200).send(restaurants);

    } catch (e : any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});

// GET Handler
yelpRouter.get("/id/:id", async (
    req: Request<{id: string}, {}, {}>,
    res: Response<RestaurantDetails | string>
) => {
    try {

        console.log(req.params.id);

        const details : RestaurantDetails | null = await apiService.getRestaurantDetails(req.params.id);
        if (details == null) {
            res.status(404).send("Sorry!");
            return;
        }

        console.log(details);
        res.status(200).send(details);

    } catch (e : any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});
