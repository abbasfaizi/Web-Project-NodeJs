import { IGroupService} from "../../service/group.interface";
import { Group } from "../../model/group";
import {User} from "../../model/user";
import {Restaurants} from "../../model/restaurants";
import {groupModel} from "../model/group";
import {userModel} from "../model/user";
import {restaurantModel} from "../model/restaurants";


/* Handles operations on the Group Model */
class GroupService implements IGroupService {
    groups : Map<string,Group> = new Map<string, Group>();

    // Create New Group
    async createGroup(user : User, groupID : string, password : string, location : string, restaurants : Restaurants[]) : Promise<boolean> {
        if (await groupModel.exists({id : groupID})) {
            return false;
        }

        const restaurantIds = restaurants.map(restaurant => restaurant.id);
        const foundRestaurants = await restaurantModel.find({ id: { $in: restaurantIds } });

        const newGroup = await groupModel.create({
            id: groupID,
            host: user,
            password: password,
            location: location,
            users: [user],
            restaurants: foundRestaurants
        });

        if (!newGroup) {
            return false;
        }

        return true;
    }

    // User join group
    async joinGroup(user : User, groupID : string, password : string) : Promise<boolean> {
        if ( !(await groupModel.exists({id : groupID}))) {
            return false;
        }
        try {
            const group = await groupModel.findOne({ id: groupID });
            if (!group) {
                return false;
            }

            // Check if the password is correct
            if (group.password !== password) {
                console.log(`Invalid password for group ${groupID}.`);
                return false;
            }

            /*
            const group = await groupModel.updateOne({id: groupID, password : password}, {$addToSet: {users: user}});
            if (!group.acknowledged) {
                return false;
            }
             */

            // Add the user to the group
            group.users.push(user);
            await group.save();

            return true;
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



    // Check if user is a member of group
    async isGroupMember(groupID : string, user : User) : Promise<boolean> {
        if (await groupModel.exists({ id: groupID, users: user })) {
            return true;
        }
        return false;
    }

    // Find the restaurant with most likes from group Members, restaurants must be in the group
    async findMostLikedRestaurant(groupId: string): Promise<Restaurants | null> {

        try {
            // Get the group and its liked restaurants
            const group: Group | null = await groupModel
                .findOne({ id: groupId })
                .populate('restaurants');
            if (group == null) {
                return null;
            }

            // Get the users in the group
            // @ts-ignore
            const userIds = group.users.map((user) => user._id);

            // Get the liked restaurants for each user
            const likedRestaurants = await userModel.find(
                { _id: { $in: userIds } },
                { liked: 1 }
            );

            // Check if any user in the group has liked a restaurant
            const hasLiked = likedRestaurants.some((user) => user.liked.length > 0);
            if (!hasLiked) {
                return null;
            }

            // Flatten the liked restaurants into an array of restaurant IDs
            const restaurantIds = likedRestaurants.flatMap((user) => user.liked);

            // Count the occurrences of each restaurant ID
            const counts: Record<string, number> = {};
            restaurantIds.forEach((id) => {
                // @ts-ignore
                if (group.restaurants.some((r) => r._id.equals(id))) {
                    // @ts-ignore
                    counts[id] = (counts[id] || 0) + 1;
                }
            });

            // Find the restaurant with the most likes
            const mostLikedRestaurantId = Object.keys(counts).reduce((a, b) =>
                counts[a] > counts[b] ? a : b
            );

            // Get the most liked restaurant
            const mostLikedRestaurant: Restaurants | null = await restaurantModel.findById(
                mostLikedRestaurantId
            );

            if (mostLikedRestaurant == null) {
                return null;
            }
            return mostLikedRestaurant;
        } catch (e: any) {
            console.error(e);
            return null;
        }
    }


    // Gets the restaurants in all the groups a user is a member of, filters any already liked or disliked
    async getRestaurantsForUser(user : User) : Promise<Array<Restaurants>> {

        try {
            // Find all groups that the user is a member of and populate the restaurants field
            const theUser = await userModel.findOne({id: user.id}).populate('liked').populate('disliked');
            if (theUser == null) {
                throw new Error("Find user returned null");
            }
            // @ts-ignore
            const groups = await groupModel.find({ users: user._id }).populate('restaurants');
            if (groups == null) {
                throw new Error("Find groups returned null");
            }

            // Extract all restaurant IDs from the groups
            // @ts-ignore
            const restaurantIds = groups.flatMap(group => group.restaurants.map(r => r._id));

            // Find all restaurants that are not already liked or disliked by the user
            const removeRestaurants: Restaurants[] = theUser.liked.concat(theUser.disliked);
            const filteredArray: Restaurants[] = await restaurantModel
                .find({
                    // @ts-ignore
                    _id: { $in: restaurantIds, $nin: removeRestaurants.map(r => r._id) }
                });

            return filteredArray;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}

export function makeGroupService() : IGroupService {
    return new GroupService();
}

