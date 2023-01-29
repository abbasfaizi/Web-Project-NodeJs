// src/router/FoodRouter.ts
import { DishService } from "../service/dish.service";
import { Router } from "express";

export class FoodRouter {
  private foodService: DishService;

  constructor(foodService: DishService) {
    this.foodService = foodService;
  }

  router(): Router {
    const router = Router();
    router.get("/", (req, res) => {
      res.send(this.foodService.getFoods());
    });
    router.post("/", (req, res) => {
      this.foodService.addFood(req.body);
      res.send("Food added successfully");
    });
    return router;
  }
}
