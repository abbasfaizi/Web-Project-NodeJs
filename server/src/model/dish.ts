import { User } from "./user";

export class Dish {

    id : number;
    name : string;
    imageUrl: string; //Url to the image of the food.
    likedBy: User[];
    dislikedBy: User[];  //So the dislike and like should obviously be referenced to the user entity, i think.

    constructor( id: number, name: string, imageUrl: string) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.likedBy = [];
        this.dislikedBy = [];
    }

    like(user:User) {
        this.likedBy.push(user); //push a user to the "likedBy" array
    }

    dislike(user:User) {
        this.dislikedBy.push(user); //push a user to the "dislikedBy" array
    }
}
