/*
import {IUserService} from "./user.interface";
import {MUser} from "../model/user.model";
import {MRestaurants} from "../model/restaurants.model";

class UserService implements IUserService{

  // Save users with Map, Mapping unique ID's to User objects
  users : Map<string,MUser> = new Map<string, MUser>();

  // Add a user
  async registerUser(id : string, password : string) : Promise<boolean> {
    if (this.users.has(id)) {
      return false;
    }

    let user = new MUser(id, password);
    this.users.set(user.id, user);
    return true;
  }

  // Checks if user exists
  async checkUser(id : string):Promise<boolean> {
    return this.users.has(id);
  }


  // Return the user
  async findUser(id : string) : Promise<MUser> {
    return this.users.get(id)!;
  }

  // Return all users
  async getUsers():Promise<Map<string, MUser>> {
    return this.users;
  }

  // Save liked restaurant to user
  async likeRestaurant(id : string, restaurant : MRestaurants) : Promise<boolean> {
    if (!this.users.has(id)) {
      return false;
    }

    let user = this.users.get(id);
    user!.liked.push(restaurant);
    this.users.set(id, user!);
    return true;
  }

  // Save disliked restaurant to user
  async dislikeRestaurant(id : string, restaurant: MRestaurants) : Promise<boolean> {
    if (!this.users.has(id)) {
      return false;
    }

    let user = this.users.get(id);
    user!.disliked.push(restaurant);
    this.users.set(id, user!);
    return true;
  }

  // Return all liked restaurants
  async getLikedRestaurants(id : string) : Promise<Set<MRestaurants>> {
    const user = this.users.get(id);
    return new Set<MRestaurants>(user!.liked);
  }

  // Return all disliked restaurants
  async getDislikedRestaurants(id : string) : Promise<Set<MRestaurants>> {
    const user = this.users.get(id);
    return new Set<MRestaurants>(user!.disliked);
  }

}

export function makeUserService() : IUserService {
  return new UserService();
}
export { IUserService };
 */

