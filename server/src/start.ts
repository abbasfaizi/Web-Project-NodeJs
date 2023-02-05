/**
* Required External Modules
*/


import express from "express";
import { restaurantRouter } from "./router/restaurant.router";
import { userRouter } from "./router/user.router";
import {defaultRouter} from "./router/default.router";


/**
* App Variables
*/



export const app = express();


/**
* App Configuration
*/


app.use(express.json());
app.use("/dish", restaurantRouter);  // Example: http://localhost:8080/dish
app.use("/user", userRouter); //  Example: http://localhost:8080/user
app.use("*", defaultRouter); //   Example: http://localhost:8080
