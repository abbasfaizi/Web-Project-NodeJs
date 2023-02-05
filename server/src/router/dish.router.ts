import express, { Request, Response } from "express";
import { makeDishService } from "../service/dish.service";
import { Restaurants } from "../model/restaurants";

const dishService = makeDishService()   // For using service layer functions
export const dishRouter = express.Router()

// GET handler
dishRouter.get("*", async (req, res) => {
    res.status(200).send("Welcome to the Restaurants Page!! [GET]");
});

// POST Handler
dishRouter.post("*", async (req,res) => {
    res.status(200).send("Welcome to the Restaurants Page!! [POST]");
});

// PUT Handler
dishRouter.put("*", async (req,res) => {
    res.status(200).send("Welcome to the Restaurants Page!! [PUT]");
});
