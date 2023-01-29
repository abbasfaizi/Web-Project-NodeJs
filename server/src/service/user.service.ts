//Service layer we provide some sort of API to handle operations that we are going to make on the data that comes from the model layer

import { User } from "../model/user";

export class UserService {
  private users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User): void {
    this.users.push(user);
  }
}
