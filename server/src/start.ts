/**
* Required External Modules
*/


import express from "express";
//import { taskRouter } from "./router/task";


/**
* App Variables
*/



export const app = express();


/**
* App Configuration
*/


app.use(express.json());
//app.use("/task", taskRouter);