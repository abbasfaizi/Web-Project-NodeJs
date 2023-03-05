import {IGroupService} from "./group.interface";
import {MGroup} from "../model/group.model";
import {MUser} from "../model/user.model";
import {User} from "../model/user";

class GroupService implements IGroupService {
    groups : Map<string,MGroup> = new Map<string, MGroup>();

    // Create New Group
    async createGroup(user : MUser, groupID : string, password : string) : Promise<boolean> {
        const group : MGroup = new MGroup(user, groupID, password);
        this.groups.set(groupID, group);
        return true;
    }

    // User join group
    async joinGroup(user : MUser, groupID : string) : Promise<boolean> {
        if (!this.groups.has(groupID)) {
            return false;
        }

        const group : MGroup = this.groups.get(groupID)!;
        group.users.push(user);
        this.groups.set(groupID, group);
        return true;
    }

    // Check if group exists
    async isGroup(groupID : string) : Promise<boolean> {
        return this.groups.has(groupID);
    }

    // Get group
    async getGroup(groupID : string) : Promise<MGroup> {
        return this.groups.get(groupID)!;
    }

    // Get all Group Members
    async groupMembers(groupID: string) : Promise<Set<User>> {
        const group : MGroup = this.groups.get(groupID)!;
        return new Set<MUser>(group.users);
    }

    // Check if user is a member of group
    async isGroupMember(groupID : string, user : MUser) : Promise<boolean> {
        if (!this.groups.has(groupID)) {
            return false;
        }

        const group : MGroup = this.groups.get(groupID)!;
        return group.users.includes(user);
    }


}

export function makeRestaurantService() : IGroupService {
    return new GroupService();
}
