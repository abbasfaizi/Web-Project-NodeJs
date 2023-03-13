import {User} from "../model/user";
import {Restaurants} from "../model/restaurants";

export interface IUserService {
    registerUser(id : string, password : string) : Promise<boolean>;
    checkUser(id : string) : Promise<boolean>;
    findUser(id : string) : Promise<User>;
    likeRestaurant(id : string, restaurant : Restaurants) : Promise<boolean>;
    dislikeRestaurant(id : string, restaurant : Restaurants) : Promise<boolean>;
    getLikedRestaurants(id : string) : Promise<Set<Restaurants>>;
    getDislikedRestaurants(id : string) : Promise<Set<Restaurants>>;

}

