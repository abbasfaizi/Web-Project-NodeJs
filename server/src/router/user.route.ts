//In the router layer we should handle all request and determne which service should handle the request for the user entity


import { UserService } from "../service/user.service";
import { Router } from "express";

export class UserRouter {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  router(): Router {
    const router = Router();
    router.get("/", (req, res) => {
      res.send(this.userService.getUsers());
    });
    router.post("/", (req, res) => {
      this.userService.addUser(req.body);
      res.send("User added successfully");
    });
    return router;
  }
}