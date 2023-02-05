import express, { Request, Response } from "express";
import { makeDishService } from "../service/restaurant.service";
import { Restaurants } from "../model/restaurants";

const dishService = makeDishService()   // For using service layer functions
export const restaurantRouter = express.Router()

// GET handler
restaurantRouter.get("*", async (req, res) => {
    res.status(200).send("Welcome to the Restaurants Page!! [GET]");
});

// POST Handler
restaurantRouter.post("*", async (req, res) => {
    res.status(200).send("Welcome to the Restaurants Page!! [POST]");
});

// PUT Handler
restaurantRouter.put("*", async (req, res) => {
    res.status(200).send("Welcome to the Restaurants Page!! [PUT]");
});
