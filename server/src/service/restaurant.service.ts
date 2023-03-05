import {IRestaurantService} from "./restaurant.interface";
import {MRestaurants} from "../model/restaurants.model";

class RestaurantService implements IRestaurantService{

  // Save restaurants with Map, Mapping unique ID's to Restaurant objects
  restaurantsMap: Map<number, MRestaurants> = new Map<number, MRestaurants>();

  // Create & Add to stored restaurants
  async createRestaurant(id : number, name : string, imageUrl : string) : Promise<boolean> {
    if (this.restaurantsMap.has(id)) {
      return false;
    }
    const restaurant : MRestaurants = new MRestaurants(id, name, imageUrl);
    this.restaurantsMap.set(restaurant.id, restaurant);
    return true;
  }

  // Check if restaurant is stored
  async checkRestaurant(id : number) : Promise<boolean> {
    return this.restaurantsMap.has(id);
  }

  // Return the found restaurant
  async getRestaurant(id : number) : Promise<MRestaurants> {
    const restaurant = this.restaurantsMap.get(id);
    return restaurant!;
  }

  // Return all stored restaurants
  async getRestaurants() : Promise<Map<number, MRestaurants>> {
    return this.restaurantsMap;
  }

}

export function makeRestaurantService() : IRestaurantService {
  return new RestaurantService();
}
