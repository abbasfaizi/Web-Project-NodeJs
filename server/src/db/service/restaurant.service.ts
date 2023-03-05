import { restaurantModel } from "../model/restaurants";
import {Restaurants} from "../../model/restaurants";
import {IRestaurantService} from "../../service/restaurant.interface";


class RestaurantService implements IRestaurantService{

    // Create & Add to stored restaurants
    async createRestaurant(id : number, name : string, imageUrl : string) : Promise<boolean> {
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
    async checkRestaurant(id : number) : Promise<boolean> {
        if (await restaurantModel.exists({id : id})) {
            return true;
        }
        return false;
    }

    // Return the found restaurant
    async getRestaurant(id : number) : Promise<Restaurants> {
        const restaurant : Restaurants | null = await restaurantModel.findOne({id : id});
        if (restaurant == null) {
            return undefined!;
        }
        return restaurant;
    }

    // Return all stored restaurants
    async getRestaurants() : Promise<Map<number, Restaurants>> {
        let restaurantsMap : Map<number, Restaurants> = new Map<number, Restaurants>();
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