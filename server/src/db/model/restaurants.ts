import { Schema} from 'mongoose';
import { conn } from "./conn";
import {Restaurants} from "../../model/restaurants";

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
