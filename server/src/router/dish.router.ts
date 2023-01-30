import express, { Request, Response } from "express";
import { makeDishService } from "../service/dish.service";
import { Dish } from "../model/dish";

const dishService = makeDishService()
export const dishRouter = express.Router()

// GET handler
dishRouter.get("*", async (req, res) => {
    res.status(200).send("Welcome to the Dish Page!! [GET]");
});

// POST Handler
dishRouter.post("*", async (req,res) => {
    res.status(200).send("Welcome to the Dish Page!! [POST]");
});

// PUT Handler
dishRouter.put("*", async (req,res) => {
    res.status(200).send("Welcome to the Dish Page!! [PUT]");
});
