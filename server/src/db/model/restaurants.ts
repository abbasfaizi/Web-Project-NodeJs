import { Schema} from 'mongoose';
import { conn } from "./conn";
import {Restaurants} from "../../model/restaurants";

// Creating a new schema for the restaurants collection using the 'Schema' class
const restaurantSchema : Schema = new Schema<Restaurants>({
   // Defining the 'id' field as a required string that must be unique
    id: {
        type: String,
        required: true,
        unique: true,
    },
    // Defining the 'name' field as a required string
    name: {
        type: String,
        required: true,
    },
    // Defining the 'imageUrl' field as a required string
    imageUrl: {
        type: String,
        required: true,
    },
});
// Exporting the restaurant model as a Mongoose model using the 'conn' object
export const restaurantModel = conn.model<Restaurants>('Restaurants', restaurantSchema);
