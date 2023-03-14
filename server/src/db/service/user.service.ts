import { userModel } from "../model/user";
import { User } from "../../model/user";
import { Restaurants } from "../../model/restaurants";
import { IUserService } from "../../service/user.interface";
import {restaurantModel} from "../model/restaurants";
import {exists} from "fs";
import {response} from "express";

class UserService implements IUserService{


    // Add a user
    async registerUser(id : string, password : string) : Promise<boolean> {
        if (await userModel.exists({id : id})) {
            return false;
        }

        await userModel.create({
            id : id,
            password : password,
            liked : [],
            disliked : []
        });

        return true;
    }

    // Checks if user exists
    async checkUser(id : string):Promise<boolean> {
        if (await userModel.exists({id : id})) {
            return true;
        }
        return false;
    }


    // Return the user
    async findUser(id : string) : Promise<User> {
        const user : User | null = await userModel.findOne({id : id});
        if (user == null) {
            return undefined!;
        }
        return user;
    }

    // Save liked restaurant to user
    async likeRestaurant(id : string, restaurant : Restaurants) : Promise<boolean> {
        try {
            console.log(restaurant);
            await userModel.updateOne({"id": id}, {$addToSet: {liked: restaurant}});
            await userModel.updateMany({"id" : id}, { $pull : {disliked : { $in : [restaurant]}}});
            return true;

        } catch (e) {
            console.log(" <----------------------------------------->")
            console.log(e);
            return false;
        }
    }

    // Save disliked restaurant to user
    async dislikeRestaurant(id : string, restaurant: Restaurants) : Promise<boolean> {
        try {
            console.log(restaurant);
            await userModel.updateOne({"id": id}, {$addToSet: {disliked: restaurant}});
            await userModel.updateMany({"id" : id}, { $pull : {liked : { $in : [restaurant]}}});
            return true;

            } catch (e) {
            console.log(" <----------------------------------------->")
            console.log(e);
            return false;
        }
    }

    // Return all liked restaurants
    async getLikedRestaurants(id : string) : Promise<Set<Restaurants>> {
        let liked : Set<Restaurants>;
        const user : User | null = await userModel.findOne({id : id}).populate('liked');
        if (user == null) {
            console.log("userService, getLikedRestaurants method failed");
            return liked = new Set<Restaurants>();
        }

        //console.log(" ----------   ");
        liked = new Set<Restaurants>(user.liked);
        /*
        for (let i = 0; i < user.liked.length; i++) {
            let restaurant = await restaurantModel.findById(user.liked[i]);
            if (restaurant != null) {
                liked.add(restaurant);
            }
        }
         */
        return liked;
    }

    // Return all disliked restaurants
    async getDislikedRestaurants(id : string) : Promise<Set<Restaurants>> {
        let disliked : Set<Restaurants>;
        const user : User | null = await userModel.findOne({id : id}).populate('disliked') ;
        if (user == null) {
            console.log("userService, getLikedRestaurants method failed");
            return disliked = new Set<Restaurants>();
        }

        //console.log(" ----------   ");
        disliked = new Set<Restaurants>(user.disliked);
        /*
        for (let i = 0; i < user.liked.length; i++) {
            let restaurant = await restaurantModel.findById(user.disliked[i]);
            if (restaurant != null) {
                disliked.add(restaurant);
            }
        }
         */
        return disliked;
    }

}

export function makeUserService() : IUserService {
    return new UserService();
}

