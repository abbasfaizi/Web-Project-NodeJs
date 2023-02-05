import { Restaurants } from "../model/restaurants";
import {User} from "../model/user";

export interface IRestaurantService {

  getRestaurants() : Promise<Array<Restaurants>>;

  addRestaurant(restaurant : Restaurants) : Promise<Restaurants>;

 /* like(user : User, n : number) : Promise<boolean>;

  dislike(user : User, n : number) : Promise<boolean>;
  */

}

class RestaurantService implements IRestaurantService{
  foods: Array<Restaurants> = [];

  async getRestaurants():Promise<Array<Restaurants>> {
    return this.foods;
  }

  async addRestaurant(food : Restaurants): Promise<Restaurants> {
    this.foods.push(food);
    return food
  }

  /*
  async like(user : User, n : number) : Promise<boolean> {
    const dish = this.foods[n]
    if (dish == null) {
      return false;
    }
    user.likedBy.push(user)
    return true;
  }

  async dislike(user : User, n: number) : Promise<boolean> {
    const dish = this.foods[n]
    if (dish == null) {
      return false;
    }
    dish.dislikedBy.push(user)
    return true;
  }

   */

}

export function makeDishService() : IRestaurantService {
  return new RestaurantService();
}
