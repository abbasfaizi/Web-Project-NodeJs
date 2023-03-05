import {Restaurants} from "./restaurants";

export class MRestaurants implements Restaurants {

    id : number;
    name : string;
    imageUrl: string; // Url to the image of the food.

    // Create New Restaurant
    constructor( id: number, name: string, imageUrl: string) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

}