 // So in the model layer one of our entities will definitely be the user, so I am just writing a skeleton for it and trying it out. -- Mustafa
import {Restaurants} from "./restaurants";

export class User {

    id: string;
    password: string;

    // Stores what restaurants a user likes/dislikes
    liked: Set<Restaurants>;
    disliked: Set<Restaurants>;

    constructor(id: string, password:string) {
        this.id = id;
        this.password = password;
        this.liked = new Set<Restaurants>();
        this.disliked = new Set<Restaurants>();
    }

    // push a dish (restaurant) to the dislike-array
    like(restaurant:Restaurants) {
        this.liked.add(restaurant);

        // If already in disliked then delete from there
        if (this.disliked.has(restaurant)) {
            this.disliked.delete(restaurant);
        }
    }

    // push a dish (restaurant) to the liked-array
   dislike(restaurant:Restaurants) {
        this.disliked.add(restaurant);

       // If already in liked then delete from there
       if (this.liked.has(restaurant)) {
           this.liked.delete(restaurant);
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
