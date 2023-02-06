 // So in the model layer one of our entities will definitely be the user, so I am just writing a skeleton for it and trying it out. -- Mustafa
import {Restaurants} from "./restaurants";

export class User {

    id: number;
    name: string;
    // Maybe some extra identifiers, I don't know?
    email: string;
    password: string;
    // Stores what restaurants a user likes/dislikes
    liked: Restaurants[];
    disliked: Restaurants[];

    constructor(id: number, name: string, email: string, password:string) {
        this.id = id;       //This code was taken from the initial example in the assignments page.
        this.name = name;
        this.email = email;
        this.password = password;
        this.liked = [];
        this.disliked = [];
    }

    // push a dish (restaurant) to the dislike-array
    like(restaurant:Restaurants) {
        // Check it's not already liked, avoid duplicates
        if (!this.liked.includes(restaurant)) {
            this.liked.push(restaurant);
        }

        // If already in disliked then delete from there
        if (this.disliked.includes(restaurant)) {
            this.disliked = this.disliked.filter(x => x !== restaurant);
        }
    }

    // push a dish (restaurant) to the liked-array
   dislike(restaurant:Restaurants) {
        // Check it's not already liked, avoid duplicates
        if (!this.disliked.includes(restaurant)) {
           this.disliked.push(restaurant);
       }

       // If already in liked then delete from there
       if (this.liked.includes(restaurant)) {
           this.liked = this.liked.filter(x => x !== restaurant);
       }
    }

    // get all restaurants that the user has liked
    getLikes() {
        return this.liked;
    }

    // get all restaurants that the user has disliked
    getDislikes() {
        return this.disliked;
    }

}

// We will probably have more entities like "Restaurants" and "Match" to represent the food and the matches between users.
