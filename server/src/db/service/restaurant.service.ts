import { restaurantModel } from "../model/restaurants";
import {Restaurants} from "../../model/restaurants";
import {IRestaurantService} from "../../service/restaurant.interface";


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

    // Return all stored restaurants
    async getRestaurants() : Promise<Map<string, Restaurants>> {
        let restaurantsMap : Map<string, Restaurants> = new Map<string, Restaurants>();
        const restaurantsArray : Array<Restaurants> = await restaurantModel.find();

        if (restaurantsArray == null) {
            return restaurantsMap;
        }
        for (let i = 0; i < restaurantsArray.length; i++) {
            let restaurant : Restaurants = restaurantsArray[i];
            restaurantsMap.set(restaurant.id, restaurant);
        }
        return restaurantsMap;
    }

}

export function makeRestaurantService() : IRestaurantService {
    return new RestaurantService();
}