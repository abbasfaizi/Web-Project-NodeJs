import { Restaurants } from "../model/restaurants";

export interface IRestaurantService {

    createRestaurant(id : string, name : string, imageUrl : string) : Promise<boolean>;
    checkRestaurant(restaurant : string) : Promise<boolean>;
    getRestaurant(id : string) : Promise<Restaurants>;
    // getRestaurants() : Promise<Map<string, Restaurants>>;


}

