 // So in the model layer one of our entities will definitely be the user, so I am just writing a skeleton for it and trying it out. -- Mustafa
import {Restaurants} from "./restaurants";


 export interface User {
     id: string;
     password: string;
     liked: Restaurants[];
     disliked: Restaurants[];
 }

