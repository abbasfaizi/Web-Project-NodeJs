import express, { Request, Response } from "express";
import { makeUserService } from "../../src/db/service/user.service";
import { User } from "../model/user";
import {restaurantService} from "./restaurant.router";
import {Restaurants} from "../model/restaurants";

const userService = makeUserService()      //For using service layer functions
export const userRouter = express.Router()

/* User Router */

// Route for getting all user likes
userRouter.get("/likes", async (
    req: Request<{}, {}, {}> & {
        session : {user ?: User}},
    res: Response<Set<Restaurants> | string>
) => {

    try {

        console.log(req.session.user);
        // Check session to see if user is logged in
        if (req.session.user == null) {
            res.status(401).send("Not logged in");
            return;
        }

        const id : string = req.session.user.id; // Unique user ID

        // Get & Send all user liked restaurants
        const restaurants = await userService.getLikedRestaurants(id);
        res.status(200).send(JSON.stringify([...restaurants]));
        console.log(restaurants);

    } catch (e : any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});

// Route for getting all user dislikes
userRouter.get("/dislikes", async (
    req: Request<{}, {}, {}> & {
        session : {user ?: User}},
    res: Response<Set<Restaurants> | string>
) => {

    try {

        console.log(req.session.user);
        // Check session to see if user is logged in
        if (req.session.user == null) {
            res.status(401).send("Not logged in");
            return;
        }


        const id : string = req.session.user.id; // Unique user ID


        // Get & Send all user disliked restaurants
        const restaurants = await userService.getDislikedRestaurants(id);
        res.status(200).send(JSON.stringify([...restaurants]));
        console.log(restaurants);

    } catch (e : any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});

// Route for user registering
userRouter.post("/register", async (
    req: Request<{}, {}, {userid : string, password : string}>,
    res: Response<string>
) => {

    try {

        // Check request body parameters for null
        if (req.body.userid == null || req.body.password == null ) {
            res.status(400).send("Missing username or password!");
            return;
        }

        if (typeof (req.body.userid) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- username has type
            ${typeof (req.body.userid)}`);
            return;
        }

        if (typeof (req.body.password) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- password has type
            ${typeof (req.body.password)}`);
            return;
        }

        const id : string = req.body.userid; // Given User id
        const password : string = req.body.password; // Given User password

        // Check username is not already taken and register user
        const notTaken : boolean = await userService.registerUser(id, password);
        if (!notTaken) {
            res.status(409).send("Username/ID is already Taken!");
            return;
        }

        res.status(201).send("User has been registered");

    } catch (e : any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});

// Route for user login
userRouter.post("/login", async (
    req: Request<{}, {}, {userid : string, password : string}> & {
         session : {user ?: User}},
    res: Response<string>
) => {

    try {

        console.log(req.body);

        // Check request body parameters for null
        if (req.body.userid == null || req.body.password == null ) {
            res.status(400).send("Missing username or password!");
            return;
        }

        if (typeof (req.body.userid) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- username has type
            ${typeof (req.body.userid)}`);
            return;
        }

        if (typeof (req.body.password) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- password has type
        ${typeof (req.body.password)}`);
            return;
        }

        const id : string = req.body.userid; // Given User id
        const password : string = req.body.password; // Given User password

        // Check user is registered
        const found = await userService.checkUser(id);
        if (!found) {
            res.status(401).send("Incorrect Username or Password!");
            return;
        }

        // Check password is correct
        const user = await userService.findUser(id);
        if (user.password !== password) {
            res.status(401).send("Incorrect Username or Password!");
            return;
        }

        req.session.user = user;
        res.status(200).send("Logged in");
        console.log("logged in"); // -----

    } catch (e : any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});

// Route for user logout
userRouter.delete("/logout", async (
    req: Request<{ }, {}, {}> & {
        session : {user ?: User}},
    res: Response<string>
) => {

    try {
        console.log("--------------------------------->");
        console.log(req.session.user);
        if (req.session.user == null) {
            res.status(401).send("Not logged in");
            return;
        }

        req.session.user = undefined;
        res.status(200).send("Logged out");
        console.log("logged out"); // -----

    } catch (e : any) {
        console.log(e);
        res.status(500).send(e.message);
    }

});


// Route for user like or dislike operations on restaurants
userRouter.put("/:rid", async (
    req: Request<{ rid : string }, {}, {operation : string}> & {
        session : {user ?: User}},
    res: Response<string>
) => {

    try {
        console.log("--------------------------------->");
        console.log(req.session.user);
        if (req.session.user == null) {
            res.status(401).send("Not logged in");
            return;
        }

        // Check path indexes and request body for null
        if ((req.session.user.id == null) || (req.params.rid == null) ||
            (req.body.operation == null)) {
            res.status(400).send("Faulty call! Index/operation can't be null");
            return;
        }

        if (typeof (req.body.operation) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- operation has type
            ${typeof (req.body.operation)}`);
            return;
        }
        const id : string = req.session.user.id; // Unique user ID
        const rid : string = req.params.rid;



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
        const found : boolean = await restaurantService.checkRestaurant(rid);
        if (!found) {
            res.status(404).send("Can't find the restaurant for the given index!");
            return;
        }
        const restaurant = await restaurantService.getRestaurant(rid);
        console.log(restaurant);

        let completed : boolean;
        if (like) {
            completed = await userService.likeRestaurant(id, restaurant);
        } else {
            completed = await userService.dislikeRestaurant(id, restaurant);
        }

        if (!completed) {
            res.status(404).send("Operation failed, most likely user error. Try again!");
            return;
        }
        res.status(200).send("Operation Successful!");

    } catch (e : any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});
