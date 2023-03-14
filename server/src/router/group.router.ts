import express, {Request, Response} from "express";
import {userRouter} from "./user.router";
import { makeGroupService } from "../db/service/group.service";
import {User} from "../model/user";
import {Group} from "../model/group";
import {Restaurants} from "../model/restaurants";
import {makeYelpApiService} from "../api/yelp.api";
import {restaurantService} from "./restaurant.router";

export const groupService = makeGroupService();

const KEY : string = "ZObVyWtKvwlGWl3TjzdECAEvJZ9OhcadjEsNFSKJn8Owmzed" +
    "P1qgyYij4Z1EKNAhlLBcOmYn-R1FJXOmK6du1IE7zyuV2kqHkCX4JPlaVn_liissZbddfdiSpXMLZHYx";

export const apiService = makeYelpApiService(KEY);
export const groupRouter = express.Router()


/* Group Router */

// Route for getting most liked restaurant in a group
groupRouter.get("/:group", async (
    req: Request<{group : string}, {}, {}> & {
        session : {user ?: User}},
    res: Response<Restaurants | string>
) => {
    try {

        console.log(req.session.user);
        // Check session to see if user is logged in
        if (req.session.user == null) {
            res.status(401).send("Not logged in");
            return;
        }
        if (!await groupService.isGroup(req.params.group)) {
            res.status(404).send("Can't find group");
            return;
        }
        if (!(await groupService.isGroupMember(req.params.group, req.session.user))) {
            res.status(401).send("Not a group Member");
            return;
        }

        const restaurant : Restaurants | null = await groupService.findMostLikedRestaurant((req).params.group);
        console.log(restaurant);
        if (restaurant == null) {
            res.status(404).send("Found No Match!");
            return;
        }
        res.status(200).send(restaurant);

    } catch (e : any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});


// Route for creating group
groupRouter.post("/create", async (
    req: Request<{}, {}, {id : string, password : string, location : string}> & {
        session : {user ?: User, group?: Group}},
    res: Response<string>
) => {
    try {
        console.log(req.session.user);
        // Check session to see if user is logged in
        if (req.session.user == null) {
            res.status(401).send("Not logged in");
            return;
        }


        // Check request body parameters for null
        if (req.body.id == null || req.body.password == null || req.body.location == null) {
            res.status(400).send("Missing group id or password!");
            return;
        }

        if (typeof (req.body.id) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- group id has type
            ${typeof (req.body.id)}`);
            return;
        }

        if (typeof (req.body.password) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- password has type
            ${typeof (req.body.password)}`);
            return;
        }

        if (typeof (req.body.location) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- location has type
            ${typeof (req.body.location)}`);
            return;
        }



        if (await groupService.isGroup(req.body.id)) {
            res.status(409).send("GroupName/ID is already Taken!");
            return;
        }


        /* -------------- Connect Api Calls ------------------ */
        const restaurants : Array<Restaurants> | null = await apiService.getRestaurants(req.body.location);
        if (restaurants == null || !Array.isArray(restaurants)) {
            res.status(400).send("Not a valid location!")
            return;
        }


        const promises = restaurants.map(restaurant => {

            return restaurantService.createRestaurant(restaurant.id, restaurant.name, restaurant.imageUrl);
        });

        await Promise.all(promises);

        /* -------------------------------- */
        if ( !(await groupService.createGroup(req.session.user, req.body.id, req.body.password, req.body.location, restaurants))) {
            res.status(409).send("GroupName/ID is already Taken!");
            return;
        }

        // req.session.group = await groupService.getGroup(req.body.id);
        res.status(201).send("Group has been Created");

    } catch (e : any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});

// Route for joining a group
groupRouter.post("/join", async (
    req: Request<{}, {}, {id : string, password : string}> & {
        session : {user ?: User, group?: Group}},
    res: Response<string>
) => {
    try {
        console.log(req.session.user);
        // Check session to see if user is logged in
        if (req.session.user == null) {
            res.status(401).send("Not logged in");
            return;
        }


        // Check request body parameters for null
        if (req.body.id == null || req.body.password == null ) {
            res.status(400).send("Missing group id or password!");
            return;
        }

        if (typeof (req.body.id) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- group id has type
            ${typeof (req.body.id)}`);
            return;
        }

        if (typeof (req.body.password) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- password has type
            ${typeof (req.body.password)}`);
            return;
        }

        if (!await groupService.isGroup(req.body.id)) {
            res.status(404).send("Can't find group");
            return;
        }

        if ( await groupService.isGroupMember(req.body.id, req.session.user)) {
            res.status(400).send("User is already a member");
            return;
        }

        if ( !(await groupService.joinGroup(req.session.user, req.body.id, req.body.password))) {
            res.status(401).send("Incorrect GroupName/ID or Password!");
            return;
        }

        // req.session.group = await groupService.getGroup(req.body.id);
        res.status(201).send("Joined Group");

    } catch (e : any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});
