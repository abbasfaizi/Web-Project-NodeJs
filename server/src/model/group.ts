import { User } from "./user";
import {Restaurants} from "./restaurants";
// import {Restaurant} from "./restaurants";



export interface Group {
    id: string;
    host: User;
    password: string;
    users: User[];
    location : string;
    restaurants : Restaurants[];
}

