import { Schema} from 'mongoose';
import { conn } from "./conn";
import {Restaurants} from "../../model/restaurants";

/* Represents the Restaurants model in the database */
const restaurantSchema : Schema = new Schema<Restaurants>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
});
export const restaurantModel = conn.model<Restaurants>('Restaurants', restaurantSchema);
