import { User } from "./user";

export class group {

    name : string;
    password: string;
    users : User[];

    constructor( id: number, name: string, password: string) {
        this.name = name;
        this.password = password;
    }

}
