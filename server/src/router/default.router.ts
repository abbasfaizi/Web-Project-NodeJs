import express from "express";
import {userRouter} from "./user.router";

export const defaultRouter = express.Router()

// GET Handler
defaultRouter.get("*", async (req, res) => {
    res.status(404).send("Wrong Page!! [GET] ")
});

// POST Handler
defaultRouter.post("*", async (req, res) => {
    res.status(404).send("Wrong Page!! [POST] ")
});

// PUT Handler
defaultRouter.put("*", async (req, res) => {
    res.status(404).send("Wrong Page!! [PUT] ")
});

