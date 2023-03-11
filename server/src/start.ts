/**
* Required External Modules
*/


import express, { Express } from "express";
import session from "express-session"
import { restaurantRouter } from "./router/restaurant.router";
import { userRouter } from "./router/user.router";
import {defaultRouter} from "./router/default.router";
import cors from "cors";
import {groupRouter} from "./router/group.router";
import {yelpRouter} from "./router/yelp.router";


/**
* App Variables
*/



export const app : Express = express();


/**
* App Configuration
*/


app.use(express.json());
app.use(session({
    secret : "Your secret key",
    resave : false,
    saveUninitialized : true
}));
app.use(cors({
    origin: true,
    credentials : true
}));
app.use("/restaurant", restaurantRouter);  // Example: http://localhost:8080/dish
app.use("/user", userRouter); //  Example: http://localhost:8080/user
app.use("/group", groupRouter); //  Example: http://localhost:8080/group
app.use("/yelp", yelpRouter); //  Example: http://localhost:8080/yelp For Testing Only, Remove Afterwards -----------

app.use("*", defaultRouter); //   Example: http://localhost:8080
