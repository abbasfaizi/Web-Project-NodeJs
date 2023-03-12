import { Schema } from 'mongoose';
import { conn } from "./conn";
import { User } from "../../model/user";


// Creating a new schema for the users collection using the 'Schema' class
const userSchema : Schema = new Schema<User>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    liked: [{
        type: Schema.Types.ObjectId,
        ref: 'Restaurants',
    }],
    disliked: [{
        type: Schema.Types.ObjectId,
        ref: 'Restaurants',
    }],
});
// Exporting the user model as a Mongoose model using the 'conn' object
export const userModel = conn.model<User>('Users', userSchema);
