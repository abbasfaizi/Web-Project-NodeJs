import { Dish } from "../model/dish";
import {User} from "../model/user";

export interface IDishService {

  getFoods() : Promise<Array<Dish>>;

  addFood(food : Dish) : Promise<Dish>;

  like(user : User, n : number) : Promise<boolean>;
  dislike(user : User, n : number) : Promise<boolean>;

}

class DishService implements IDishService{
  foods: Array<Dish> = [];

  async getFoods():Promise<Array<Dish>> {
    return this.foods;
  }

  async addFood(food : Dish): Promise<Dish> {
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