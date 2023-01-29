//So in the model layer one of our entities will definitely be the user so i'm just writing a skeleton for it and trying it out. -- Mustafa

export class User {

    id: number;
    name: string;
    //Maybe some extra identifiers, i don't know?
    email: string;
    password: string;

constructor(id: number, name: string, email: string, password:string) {
    this.id = id;       //This code was taken from the intial example in the assigments page.
    this.name = name;    
    this.email = email;
    this.password = password;
    
}


}

//We will probably have more entities like "Dish" and "Match" to represent the food and the matches between users.
