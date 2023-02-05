import { User } from "../model/user";
import {Restaurants} from "../model/restaurants";

export interface IUserService {

  getUsers() : Promise<Array<User>>;

  addUser(user : User) : Promise<boolean>;

  deleteUser(user : User) : Promise<boolean>;

  likeRestaurant(user : User, n : number) : Promise<boolean>;

  dislikeRestaurant(user : User, n : number) : Promise<boolean>;

}


class UserService implements IUserService{
  users : Array<User> = [];
  restaurant: Array<Restaurants>;

  async getUsers():Promise<Array<User>> {
    return this.users;
  }

  async addUser(user : User): Promise<boolean> {
    if (user == null) {
      return false;
    }
    this.users.push(user);
    return true
  }

  async deleteUser(user : User): Promise<boolean> {
    if (user == null ||
        !this.users.includes(user)) {
      return false;
    }

    this.users.slice(this.users.indexOf(user), 1)
    return true
  }

  // ???
  async likeRestaurant(user : User, n: number): Promise<boolean> {
    const restaurant = this.restaurant[n];
    if (restaurant == null){
      return Promise.resolve(false);
    }

    user.liked.push(restaurant);

    return Promise.resolve(true);
  }

  // ???
  async dislikeRestaurant(user : User, n: number): Promise<boolean> {
    const restaurant = this.restaurant[n];
    if (restaurant == null){
      return Promise.resolve(false);
    }

    user.disliked.push(restaurant);

    return Promise.resolve(true);
  }

}

export function makeUserService() : IUserService {
  return new UserService();
}
