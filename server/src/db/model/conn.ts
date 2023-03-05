import { createConnection } from "mongoose";
import {userModel} from "./user";
import {restaurantModel} from "./restaurants";
import {groupModel} from "./group";

export const conn = createConnection("mongodb+srv://foodmatcher:dat076@dat076.nqicb2v.mongodb.net/test");
