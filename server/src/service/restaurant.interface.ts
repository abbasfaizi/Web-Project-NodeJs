import { Restaurants } from "../model/restaurants";

/* Restaurant Service layer implementation interface */
export interface IRestaurantService {

    createRestaurant(id : string, name : string, imageUrl : string) : Promise<boolean>;
    checkRestaurant(restaurant : string) : Promise<boolean>;
    getRestaurant(id : string) : Promise<Restaurants>;
    // getRestaurants() : Promise<Map<string, Restaurants>>;


}

