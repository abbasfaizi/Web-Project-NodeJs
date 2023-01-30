import express, { Request, Response } from "express";
import { makeUserService } from "../service/user.service";
import { User } from "../model/user";

const userService = makeUserService()      //For using service layer functions
export const userRouter = express.Router()

// GET Handler
userRouter.get("*", async (req, res) => {
    res.status(200).send("Welcome to the User Page!! [GET]");
});

// POST Handler
userRouter.post("*", async (req, res) => {
    res.status(200).send("Welcome to the User Page!! [POST]");
});

// PUT Handler
userRouter.put("*", async (req, res) => {
    res.status(200).send("Welcome to the User Page!! [PUT]");
});
