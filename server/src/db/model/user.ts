import { Schema } from 'mongoose';
import { conn } from "./conn";
import { User } from "../../model/user";



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

export const userModel = conn.model<User>('Users', userSchema);
