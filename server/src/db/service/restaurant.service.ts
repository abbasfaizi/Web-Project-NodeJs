import { restaurantModel } from "../model/restaurants";
import {Restaurants} from "../../model/restaurants";
import {IRestaurantService} from "../../service/restaurant.interface";


/* Handles operations on the Restaurant model */
class RestaurantService implements IRestaurantService{

    // Create & Add to stored restaurants
    async createRestaurant(id : string, name : string, imageUrl : string) : Promise<boolean> {
        if (await restaurantModel.exists({id : id})) {
            return false;
        }

        await restaurantModel.create({
            id : id,
            name : name,
            imageUrl : imageUrl
        });

        return true;
    }

    // Check if restaurant is stored
    async checkRestaurant(id : string) : Promise<boolean> {
        if (await restaurantModel.exists({id : id})) {
            return true;
        }
        return false;
    }

    // Return the found restaurant
    async getRestaurant(id : string) : Promise<Restaurants> {
        const restaurant : Restaurants | null = await restaurantModel.findOne({id : id});
        if (restaurant == null) {
            return undefined!;
        }
        return restaurant;
    }

}

export function makeRestaurantService() : IRestaurantService {
    return new RestaurantService();
}

