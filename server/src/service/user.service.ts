import { User } from "../model/user";
import {Dish} from "../model/dish";

export interface IUserService {

  getUsers() : Promise<Array<User>>;

  addUser(user : User) : Promise<boolean>;

  deleteUser(user : User) : Promise<boolean>;

}


class UserService implements IUserService{
  users : Array<User> = [];

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

}

export function makeUserService() : IUserService {
  return new UserService();
}