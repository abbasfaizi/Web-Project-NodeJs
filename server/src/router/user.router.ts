import express, { Request, Response } from "express";
import { makeUserService } from "../service/user.service";
import { User } from "../model/user";
import {restaurantService} from "./restaurant.router";
import {Restaurants} from "../model/restaurants";

const userService = makeUserService()      //For using service layer functions
export const userRouter = express.Router()

/* -------------- Test Set [U] ------------- */
console.log("Inputting User Test Set ------------------------->")
userService.registerUser("user0", "a");
userService.registerUser("user1", "b");
userService.registerUser("user2", "c");
userService.registerUser("user3", "d");
console.log(userService.getUsers());
/* --------------------------------------*/


// GET Handlers
userRouter.get("/:userid/likes", async (
    req: Request<{ userid : string }, {}, {}> & {
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

        // Check id for null
        if (req.params.userid == null ) {
            res.status(400).send("Faulty call! ID is null");
            return;
        }

        const id : string = req.params.userid; // Unique user ID
        const exists : boolean = await userService.checkUser(id);
        if (!exists) {
            res.status(404).send("Couldn't find the user");
            return;
        }

        // Get & Send all user liked restaurants
        const restaurants = await userService.getLikedRestaurants(id);
        res.status(200).send(JSON.stringify([...restaurants]));
        console.log(restaurants);

    } catch (e : any) {
        res.status(500).send(e.message);
    }
});

userRouter.get("/:userid/dislikes", async (
    req: Request<{ userid : string }, {}, {}> & {
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

        // Check id for null
        if (req.params.userid == null ) {
            res.status(400).send("Faulty call! Index is null");
            return;
        }

        const id : string = req.params.userid; // Unique user ID
        const exists : boolean = await userService.checkUser(id);
        if (!exists) {
            res.status(404).send("Couldn't find the user");
            return;
        }

        // Get & Send all user disliked restaurants
        const restaurants = await userService.getDislikedRestaurants(id);
        res.status(200).send(JSON.stringify([...restaurants]));
        console.log(restaurants);

    } catch (e : any) {
        res.status(500).send(e.message);
    }
});

// POST Handlers
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
        res.status(500).send(e.message);
    }
});

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
        res.status(500).send(e.message);
    }
});

// PUT Handler
userRouter.put("/:userid/:rid", async (
    req: Request<{userid : string, rid : string }, {}, {operation : string}> & {
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
        if ((req.params.userid == null) || (req.params.rid == null) ||
            (req.body.operation == null)) {
            res.status(400).send("Faulty call! Index/operation can't be null");
            return;
        }
        // Parse & Check id for bound
        const id : string = req.params.userid; // Unique user ID
        const rid : number = parseInt(req.params.rid, 10); // Unique restaurant ID
        if (!(rid >= 0)) {
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
        res.status(500).send(e.message);
    }
});

