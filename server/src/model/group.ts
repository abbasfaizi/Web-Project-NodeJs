import { User } from "./user";
// import {Restaurant} from "./restaurants";



export interface Group {
    id: string;
    host: User;
    password: string;
    users: User[];
}

