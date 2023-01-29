// src/service/FoodService.ts
import { Dish } from "../model/dish";

export class DishService {
  private foods: Dish[] = [];

  getFoods(): Dish[] {
    return this.foods;
  }

  addFood(food: Dish): void {
    this.foods.push(food);
  }
}