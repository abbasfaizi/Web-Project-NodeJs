import express, { Request, Response } from "express";
import { makeUserService } from "../service/user.service";
import { User } from "../model/user";
import {restaurantService} from "./restaurant.router";
import {Restaurants} from "../model/restaurants";

const userService = makeUserService()      //For using service layer functions
export const userRouter = express.Router()

/* -------------- Test Set [U] ------------- */
console.log("Inputting User Test Set ------------------------->")
userService.addUser(new User (0, "a", "", ""));
userService.addUser(new User (1, "b", "", ""));
userService.addUser(new User (3, "c", "", ""));
userService.addUser(new User (4, "d", "", ""));
console.log(userService.getUsers());
/* --------------------------------------*/


// GET Handlers
userRouter.get("/:userid/likes", async (
    req: Request<{ userid : string }, {}, {}>,
    res: Response<Array<Restaurants> | string>
) => {

    try {

        // Check id for null
        if (req.params.userid == null ) {
            res.status(400).send("Faulty call! Index is null");
            return;
        }
        // Parse & Check id for bound
        const id = parseInt(req.params.userid, 10);
        if (!(id >= 0)) {
            res.status(400).send("Index out of bound! Must be equal to or greater than 0")
        }

        // Get & Send all user liked restaurants
        const restaurants = await userService.getLikedRestaurants(id);
        res.status(200).send(restaurants);
        console.log(restaurants);

    } catch (e : any) {
        res.status(500).send(e.message);
    }
});

userRouter.get("/:userid/dislikes", async (
    req: Request<{ userid : string }, {}, {}>,
    res: Response<Array<Restaurants> | string>
) => {

    try {

        // Check id for null
        if (req.params.userid == null ) {
            res.status(400).send("Faulty call! Index is null");
            return;
        }
        // Parse & Check id for bound
        const id = parseInt(req.params.userid, 10);
        if (!(id >= 0)) {
            res.status(400).send("Index out of bound! Must be equal to or greater than 0")
        }

        // Get & Send all user disliked restaurants
        const restaurants = await userService.getDislikedRestaurants(id);
        res.status(200).send(restaurants);
        console.log(restaurants);

    } catch (e : any) {
        res.status(500).send(e.message);
    }
});

// POST Handler
userRouter.post("*", async (
    req: Request<any>,
    res: Response<any>
) => {

    try {

        // TODO
        res.status(200).send("Welcome to the User Page!! [POST]");
    } catch (e : any) {
        res.status(500).send(e.message);
    }
});

// PUT Handler
userRouter.put("/:userid/:rid", async (
    req: Request<{userid : string, rid : string }, {}, {operation : string}>,
    res: Response<string>
) => {

    try {

        console.log("--------------------------------->");

        // Check path indexes and request body for null
        if ((req.params.userid == null) || (req.params.rid == null) ||
            (req.body.operation == null)) {
            res.status(400).send("Faulty call! Index/operation can't be null");
            return;
        }
        // Parse & Check id for bound
        const uid = parseInt(req.params.userid, 10);
        const rid = parseInt(req.params.rid, 10);
        if (!(uid >= 0 && rid >= 0)) {
            res.status(400).send("Index out of bound! Must be equal to or greater than 0")
            return;
        }

        // Check operation type, either like or dislike
        let like : boolean; // true == like operation, false == dislike
        switch (req.body.operation.toLowerCase()) {

            case 'like':
                like = true;
                break;
            case 'dislike':
                like = false;
                break;
            default:
                res.status(400).send("Faulty Put Call! Operation can either be like or dislike!");
                return;
        }

        // Check the restaurant for the given index exists
        const found = await restaurantService.checkRestaurant(rid);
        if (!found) {
            res.status(404).send("Can't find the restaurant for the given index!");
            return;
        }
        const restaurant = await restaurantService.getRestaurant(rid);

        let completed : boolean;
        if (like) {
            completed = await userService.likeRestaurant(uid, restaurant);
        } else {
            completed = await userService.dislikeRestaurant(uid, restaurant);
        }

        if (!completed) {
            res.status(404).send("Operation failed, most likely user error. Try again!");
            return;
        }
        res.status(200).send("Operation Successful!");

    } catch (e : any) {
        res.status(500).send(e.message);
    }
});

