/**
* Required External Modules
*/


import express from "express";
import { dishRouter } from "./router/dish.router";
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
app.use("/dish", dishRouter);  // Example: http://localhost:8080/dish
app.use("/user", userRouter); //  Example: http://localhost:8080/user
app.use("*", defaultRouter); //   Example: http://localhost:8080
