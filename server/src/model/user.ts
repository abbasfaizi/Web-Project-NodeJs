import {Restaurants} from "./restaurants";

/* User Model layer implementation interface */
 export interface User {
     id: string;
     password: string;
     liked: Restaurants[];
     disliked: Restaurants[];
 }

