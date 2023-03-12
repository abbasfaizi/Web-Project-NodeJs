import { IGroupService} from "../../service/group.interface";
import { Group } from "../../model/group";
import {User} from "../../model/user";
import {Restaurants} from "../../model/restaurants";
import {groupModel} from "../model/group";
import {userModel} from "../model/user";
import {restaurantModel} from "../model/restaurants";


class GroupService implements IGroupService {
    groups : Map<string,Group> = new Map<string, Group>();

    // Create New Group
    async createGroup(user : User, groupID : string, password : string, location : string, restaurants : Restaurants[]) : Promise<boolean> {
        if (await groupModel.exists({id : groupID})) {
            return false;
        }

        await groupModel.create({
            id : groupID,
            host : user,
            password : password,
            users : [],
            location : location,
            restaurants : []
        });



        await groupModel.updateOne({"id": groupID}, {$addToSet: {users: user}});
        for (let i = 0; i < restaurants.length; i++) {
            const restaurant : Restaurants | null = await restaurantModel.findOne({ id: restaurants[i].id });
            if (restaurant !== null) {
                await groupModel.updateOne({"id": groupID}, {$addToSet: {restaurants: restaurant}});
            }
        }
            return true;
    }

    // User join group
    async joinGroup(user : User, groupID : string, password : string) : Promise<boolean> {

        try {
            await groupModel.updateOne({id: groupID, password : password}, {$addToSet: {users: user}});
            if (await groupModel.exists({ id: groupID, users: user })) {
                return true;
            }
            return false;

        } catch (e) {
            console.log(e);
            return false;
        }
    }

    // Check if group exists
    async isGroup(groupID : string) : Promise<boolean> {
        if (await groupModel.exists({id : groupID})) {
            return true;
        }
        return false;
    }

    // Get group
    async getGroup(groupID : string) : Promise<Group> {
        const group : Group | null = await groupModel.findOne({id : groupID});
        if (group == null) {
            console.log("getGroup Method failed ------------------->");
            return undefined!;
        }
        return group;
    }

    // Get all Group Members
    async groupMembers(groupID: string) : Promise<Set<User>> {
        //let members : Set<User>;
        const group : Group | null = await groupModel.findOne({id : groupID}).populate('users');
        if (group == null) {
            console.log("GroupMembers Method failed ------------------->");
            //return members = new Set<User>();
            return new Set<User>();
        }

        console.log(" ----------   ");
        return new Set<User>(group.users);
        /*
        members = new Set<User>();
        for (let i = 0; i < group.users.length; i++) {
            //let user = await userModel.findById(group.users[i]);
            const user = group.users[i];
            if (user != null) {
                members.add(user);
            }
        }
        return members;
         */
    }

    // Check if user is a member of group
    async isGroupMember(groupID : string, user : User) : Promise<boolean> {
        if (await groupModel.exists({ id: groupID, users: user })) {
            return true;
        }
        return false;
    }

    // Find the restaurant with most likes from group Members
    async findMostLikedRestaurant(groupId: string): Promise<Restaurants | null> {
        try {
            // Get the users in the group
            const group : Group | null = await groupModel.findOne({id : groupId}).populate('users');
            if (group == null) {
                return null;
            }

            // Get the liked restaurants for each user
            // @ts-ignore
            const userIds = group.users.map(user => user._id);
            const likedRestaurants = await userModel.find({ _id: { $in: userIds } }, { liked: 1 });

            // Flatten the liked restaurants into an array of restaurant IDs
            const restaurantIds = likedRestaurants.flatMap((user) => user.liked);


            // Count the occurrences of each restaurant ID
            const counts = restaurantIds.reduce((acc, id) => {
                // @ts-ignore
                acc[id] = (acc[id] || 0) + 1;
                return acc;
            }, {});

            // Find the restaurant with the most likes
            // @ts-ignore
            const mostLikedRestaurantId = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));

            // Get the name of the most liked restaurant
            //const mostLikedRestaurant : Restaurants | null = await restaurantModel.findOne({id : mostLikedRestaurantId});
            const mostLikedRestaurant: Restaurants | null = await restaurantModel.findById(mostLikedRestaurantId);

            if (mostLikedRestaurant == null) {
                return null;
            }
            return mostLikedRestaurant;

        } catch (e : any) {
            console.error(e);
            return null;
        }
    }

    async getGroupsForUser(user: User): Promise<Array<Group> | null> {
        try {
            const groups : Array<Group> | null = await groupModel.find({ users: user });
            if (groups == null) {
                throw new Error("Find returned null");
            }

            return groups;
        } catch (e : any) {
            console.error(e);
            return null;
        }
    }

    async getRestaurantsForUser(user : User) : Promise<Array<Restaurants>> {
        /*
        try {
            // Find all groups that the user is a member of and populate the restaurants field
            const groups = await groupModel.find({ users: user._id }).populate('restaurants');

            // Extract all restaurant IDs from the groups
            const restaurantIds = groups.flatMap(group => group.restaurants?.map(r => r._id) || []);

            // Find all restaurants that are not already liked or disliked by the user
            const likedRestaurantIds = user?.liked?.map(r => r._id) || [];
            const dislikedRestaurantIds = user?.disliked?.map(r => r._id) || [];
            const recommendedRestaurants = await restaurantModel.find({
                _id: { $nin: [...likedRestaurantIds, ...dislikedRestaurantIds] },
                _id: { $in: restaurantIds },
            });

            return recommendedRestaurants;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
         */
        try {
            // Find all groups that the user is a member of and populate the restaurants field
            console.log(user);
            const theUser = await userModel.findOne({id: user.id}).populate('liked').populate('disliked');
            console.log(theUser);
            // @ts-ignore
            const groups = await groupModel.find({ users: user._id }).populate('restaurants');


            // Extract all restaurant IDs from the groups
            // @ts-ignore
            const restaurantIds = groups.flatMap(group => group.restaurants.map(r => r._id));

            // Find all restaurants that are not already liked or disliked by the user
            const groupRestaurants = await restaurantModel
                .find({
                    _id: { $in: restaurantIds }});






            const removeRestaurants : Restaurants[] = user.liked.concat(user.disliked);
            const filteredArray : Restaurants[] = groupRestaurants.filter(restaurant => !removeRestaurants.includes(restaurant));
            console.log(filteredArray);

            return filteredArray;
        } catch (e: any) {
            console.error(e);
            return [];
        }
    }
}

export function makeGroupService() : IGroupService {
    return new GroupService();
}