import { Restaurants } from "../model/restaurants";
import {User} from "../model/user";
import {restaurantService} from "../router/restaurant.router";

export interface IRestaurantService {

    createRestaurant(id : number, name : string, imageUrl : string) : Promise<boolean>;
    checkRestaurant(restaurant : number) : Promise<boolean>;
    getRestaurant(id : number) : Promise<Restaurants>;
    getRestaurants() : Promise<Map<number, Restaurants>>;


}