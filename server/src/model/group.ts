import { User } from "./user";
import {Restaurants} from "./restaurants";

export class Group {

    id : string;
    host : string;
    password: string;
    users : Set<string>;


    // Create New Group
    constructor( user : string, id: string, password: string) {
        this.id = id;
        this.host = user;
        this.password = password;
        this.users = new Set<string>();
    }

    // User join
    addUser(user : string) {
        this.users.add(user);
    }

    // User Delete
    removeUser(user : string) {
        this.users.delete(user);
    }

    // User Membership Check
    isMember(user : string) : boolean {
        return this.users.has(user);
    }

    // Return All Group Users
    members() {
        return this.users;
    }

    // Group Ownership Transfer
    newOwner(currHost : string, newHost : string) : boolean {
        if (currHost !== this.host ||
            !(this.users.has(newHost))) {
            return false;
        }

        this.host = newHost;
        return true;
    }

}
