import { User } from "./user";

export class Dish {

    id : number;
    name : string;
    imageUrl: string; //Url to the image of the food.

    constructor( id: number, name: string, imageUrl: string) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

}
