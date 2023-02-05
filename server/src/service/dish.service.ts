import { Restaurants } from "../model/restaurants";
import {User} from "../model/user";

export interface IDishService {

  getFoods() : Promise<Array<Restaurants>>;

  addFood(food : Restaurants) : Promise<Restaurants>;

  like(user : User, n : number) : Promise<boolean>;

  dislike(user : User, n : number) : Promise<boolean>;

}

class DishService implements IDishService{
  foods: Array<Restaurants> = [];

  async getFoods():Promise<Array<Restaurants>> {
    return this.foods;
  }

  async addFood(food : Restaurants): Promise<Restaurants> {
    this.foods.push(food);
    return food
  }

  async like(user : User, n : number) : Promise<boolean> {
    const dish = this.foods[n]
    if (dish == null) {
      return false;
    }
    dish.likedBy.push(user)
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

}

export function makeDishService() : IDishService {
  return new DishService();
}
