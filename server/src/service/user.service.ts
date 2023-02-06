import { User } from "../model/user";
import {Restaurants} from "../model/restaurants";
import {restaurantService} from "../router/restaurant.router";

export interface IUserService {

  getUsers() : Promise<Map<number, User>>;
  addUser(user : User) : Promise<boolean>;
  deleteUser(id : number) : Promise<boolean>;
  likeRestaurant(id : number, restaurant : Restaurants) : Promise<boolean>;
  dislikeRestaurant(id : number, restaurant : Restaurants) : Promise<boolean>;
  getLikedRestaurants(id : number) : Promise<Array<Restaurants>>;
  getDislikedRestaurants(id : number) : Promise<Array<Restaurants>>;

}


class UserService implements IUserService{

  // Save users with Map, Mapping unique ID's to User objects
  users : Map<number,User> = new Map<number, User>();

  // Return all users
  async getUsers():Promise<Map<number, User>> {
    return this.users;
  }

  // Add a user
  async addUser(user : User) : Promise<boolean> {
    if ((user == null) ||
        (this.users.has(user.id))) {
      return false;
    }

    this.users.set(user.id, user);
    return true;
  }

  // Delete a user
  async deleteUser(id : number) : Promise<boolean> {
    if (!this.users.has(id)) {
      return false;
    }

    this.users.delete(id);
    return true;
  }

  // Save liked restaurant to user
  async likeRestaurant(id : number, restaurant : Restaurants) : Promise<boolean> {
    if (!this.users.has(id)) {
      return false;
    }

    let user = this.users.get(id);
    user!.like(restaurant);
    this.users.set(id, user!);
    return true;
  }

  // Save disliked restaurant to user
  async dislikeRestaurant(id : number, restaurant: Restaurants) : Promise<boolean> {
    if (!this.users.has(id)) {
      return false;
    }

    let user = this.users.get(id);
    user!.dislike(restaurant);
    this.users.set(id, user!);
    return true;
  }

  // Return all liked restaurants
  async getLikedRestaurants(id : number) : Promise<Array<Restaurants>> {
    const user = this.users.get(id);
    return user!.getLikes();
  }

  // Return all disliked restaurants
  async getDislikedRestaurants(id : number) : Promise<Array<Restaurants>> {
    const user = this.users.get(id);
    return user!.getDislikes();
  }

}

export function makeUserService() : IUserService {
  return new UserService();
}
