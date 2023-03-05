import express, {Request, Response} from "express";
import {userRouter} from "./user.router";
import { makeGroupService } from "../db/service/group.service";
import {User} from "../model/user";
import {Group} from "../model/group";

const groupService = makeGroupService();
export const groupRouter = express.Router()

// GET Handler
groupRouter.get("*", async (
    req: Request<any> & {
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


        res.status(200).send();
    } catch (e : any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});

// POST Handler
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

        if ( !(await groupService.createGroup(req.session.user, req.body.id, req.body.password))) {
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

// PUT Handler
groupRouter.put("/enter/:id", async (
    req: Request<{id : string}, {}, {}> & {
        session : {user ?: User, group ?: Group}},
    res: Response<string>
) => {
    try {
        console.log(req.session.user);
        // Check session to see if user is logged in
        if (req.session.user == null) {
            res.status(401).send("Not logged in");
            return;
        }

        if ((req.session.group != null) || (req.params.id == null)) {
            res.status(400).send("Faulty Call, cant already have entered another group group/ " +
                                             "incorrect group id");
            return;
        }

        if (typeof (req.params.id) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- group id has type
            ${typeof (req.params.id)}`);
            return;
        }

        if ( !(await groupService.isGroup(req.params.id))) {
            res.status(404).send("Can't find the Group for the given index!");
            return;
        }

        if (! (await groupService.isGroupMember(req.params.id, req.session.user))) {
            res.status(401).send("Not a member of the group");
            return;
        }

        req.session.group = await groupService.getGroup(req.params.id);
        res.status(201).send("Entered Group Session");

    } catch (e : any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});

groupRouter.put("/leave", async (
    req: Request<{}, {}, {}> & {
        session : {user ?: User, group ?: Group}},
    res: Response<string>
) => {
    try {
        console.log(req.session.user);
        // Check session to see if user is logged in
        if (req.session.user == null) {
            res.status(401).send("Not logged in");
            return;
        }

        console.log(req.session.user);
        // Check session to see if user is logged in
        if (req.session.group == null) {
            res.status(401).send("Havent entered a group");
            return;
        }

        req.session.group = undefined;
        res.status(201).send("Left Group Session");

    } catch (e : any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});