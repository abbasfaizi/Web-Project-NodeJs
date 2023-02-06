import { Restaurants } from "../model/restaurants";
import {User} from "../model/user";
import {restaurantService} from "../router/restaurant.router";

export interface IRestaurantService {

  getRestaurants() : Promise<Map<number, Restaurants>>;
  getRestaurant(id : number) : Promise<Restaurants>;
  addRestaurant(restaurant : Restaurants) : Promise<Restaurants>;
  checkRestaurant(restaurant : number) : Promise<boolean>;

}

class RestaurantService implements IRestaurantService{

  // Save restaurants with Map, Mapping unique ID's to Restaurant objects
  restaurantsMap: Map<number, Restaurants> = new Map<number, Restaurants>();

  // Return all stored restaurants
  async getRestaurants() : Promise<Map<number, Restaurants>> {
    return this.restaurantsMap;
  }

  // Return the found restaurant
  async getRestaurant(id : number) : Promise<Restaurants> {
    const restaurant = this.restaurantsMap.get(id);
    return restaurant!;
  }

  // Add to stored restaurants
  async addRestaurant(restaurant : Restaurants) : Promise<Restaurants> {
    this.restaurantsMap.set(restaurant.id, restaurant);
    return restaurant;
  }

  // Check if restaurant is stored
  async checkRestaurant(id : number) : Promise<boolean> {
    if (this.restaurantsMap.has(id)) {
      return true;
    }
    return false;
  }

}

export function makeRestaurantService() : IRestaurantService {
  return new RestaurantService();
}
