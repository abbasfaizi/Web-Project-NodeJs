import { Group } from "../model/group";
import {User} from "../model/user";
import {Restaurants} from "../model/restaurants"


export interface IGroupService {

    createGroup(user : User, groupID : string, password : string, location : string, restaurants : Restaurants[]) : Promise<boolean>;
    joinGroup(user : User, groupID : string, password : string) : Promise<boolean>;
    isGroup(groupID : string) : Promise<boolean>;
    getGroup(groupID : string) : Promise<Group>;
    groupMembers(groupID : string) : Promise<Set<User>>;
    isGroupMember(groupID : string, user : User) : Promise<boolean>;


    // ------
    findMostLikedRestaurant(groupId: string) : Promise<Restaurants | null>;
    getGroupsForUser(user : User) : Promise<Array<Group> | null>;
    getRestaurantsForUser(user : User) : Promise<Array<Restaurants>>;

}