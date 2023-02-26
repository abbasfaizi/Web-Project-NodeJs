import {User} from "../model/user";
import {Restaurants} from "../model/restaurants";

export interface IUserService {

  getUsers() : Promise<Map<string, User>>;
  findUser(id : string) : Promise<User>;
  checkUser(id : string) : Promise<boolean>;
  registerUser(id : string, password : string) : Promise<boolean>;
  deleteUser(id : string) : Promise<boolean>;
  likeRestaurant(id : string, restaurant : Restaurants) : Promise<boolean>;
  dislikeRestaurant(id : string, restaurant : Restaurants) : Promise<boolean>;
  getLikedRestaurants(id : string) : Promise<Set<Restaurants>>;
  getDislikedRestaurants(id : string) : Promise<Set<Restaurants>>;

}


class UserService implements IUserService{

  // Save users with Map, Mapping unique ID's to User objects
  users : Map<string,User> = new Map<string, User>();

  // Return all users
  async getUsers():Promise<Map<string, User>> {
    return this.users;
  }

  // Return the user
  async findUser(id : string) : Promise<User> {
    return this.users.get(id)!;
  }

  // Checks if user exists
  async checkUser(id : string):Promise<boolean> {
    return this.users.has(id);
  }

  // Add a user
  async registerUser(id : string, password : string) : Promise<boolean> {
    if (this.users.has(id)) {
      return false;
    }

    let user = new User(id, password);
    this.users.set(user.id, user);
    return true;
  }

  // Delete a user
  async deleteUser(id : string) : Promise<boolean> {
    if (!this.users.has(id)) {
      return false;
    }

    this.users.delete(id);
    return true;
  }

  // Save liked restaurant to user
  async likeRestaurant(id : string, restaurant : Restaurants) : Promise<boolean> {
    if (!this.users.has(id)) {
      return false;
    }

    let user = this.users.get(id);
    user!.like(restaurant);
    this.users.set(id, user!);
    return true;
  }

  // Save disliked restaurant to user
  async dislikeRestaurant(id : string, restaurant: Restaurants) : Promise<boolean> {
    if (!this.users.has(id)) {
      return false;
    }

    let user = this.users.get(id);
    user!.dislike(restaurant);
    this.users.set(id, user!);
    return true;
  }

  // Return all liked restaurants
  async getLikedRestaurants(id : string) : Promise<Set<Restaurants>> {
    const user = this.users.get(id);
    return user!.getLikes();
  }

  // Return all disliked restaurants
  async getDislikedRestaurants(id : string) : Promise<Set<Restaurants>> {
    const user = this.users.get(id);
    return user!.getDislikes();
  }

}

export function makeUserService() : IUserService {
  return new UserService();
}
