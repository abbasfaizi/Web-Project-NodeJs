import { Schema, Model } from 'mongoose';
import { conn } from "./conn";
import {Group} from "../../model/group";


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
});


export const groupModel = conn.model<Group>('Groups', groupSchema);
