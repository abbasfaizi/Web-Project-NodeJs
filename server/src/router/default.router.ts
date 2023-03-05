import express, {Request, Response} from "express";
import {userRouter} from "./user.router";
import {User} from "../model/user";

export const defaultRouter = express.Router()

// GET Handler
defaultRouter.all("*", async (
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

        res.status(404).send("Wrong Page!!")

    } catch (e : any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});
