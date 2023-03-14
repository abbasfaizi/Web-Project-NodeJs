import { Schema } from 'mongoose';
import { conn } from "./conn";
import {Group} from "../../model/group";

/* Represents the group model in the database */
const groupSchema : Schema = new Schema<Group>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    host: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }],
    location: {
        type: String,
        required: true,
    },
    restaurants: [{
        type: Schema.Types.ObjectId,
        ref: 'Restaurants',
    }],
});

export const groupModel = conn.model<Group>('Groups', groupSchema);

