import {Group} from "./group";
import {User} from "./user";

export class MGroup implements Group{

    id : string;
    host : User;
    password: string;
    users : Array<User>;


    // Create New Group
    constructor( user : User, id: string, password: string) {
        this.id = id;
        this.host = user;
        this.password = password;
        this.users = [];
    }

}
