import { Group } from "../model/group";
import {User} from "../model/user";


export interface IGroupService {

    createGroup(user : string, groupID : string, password : string) : Promise<Group>;
    joinGroup(user : string, groupID : string) : Promise<boolean>;
    leaveGroup(user : string, groupID : string) : Promise<boolean>;
    isGroup(groupID : string) : Promise<boolean>;
    getGroup(groupID : string) : Promise<Group>;
    groupMembers(groupID : string) : Promise<Set<string>>;
    isGroupMember(groupID : string, user : string) : Promise<boolean>;
    changeGroupHost(groupID : string, currHost : string, newHost : string) : Promise<boolean>;

}

class GroupService implements IGroupService {
    groups : Map<string,Group> = new Map<string, Group>();

    // Create New Group
    async createGroup(user : string, groupID : string, password : string) : Promise<Group> {
        const group : Group = new Group(user, groupID, password);
        this.groups.set(groupID, group);
        return group;
    }

    // User join group
    async joinGroup(user : string, groupID : string) : Promise<boolean> {
        if (!this.groups.has(groupID)) {
            return false;
        }

        const group : Group = this.groups.get(groupID)!;
        group.addUser(user);
        this.groups.set(groupID, group);
        return true;
    }

    // User leave group
    async leaveGroup(user : string, groupID : string) : Promise<boolean> {
        if (!this.groups.has(groupID)) {
            return false;
        }

        const group : Group = this.groups.get(groupID)!;
        group.removeUser(user);
        this.groups.set(groupID, group);
        return true;
    }

    // Check if group exists
    async isGroup(groupID : string) : Promise<boolean> {
        return this.groups.has(groupID);
    }

    // Get group
    async getGroup(groupID : string) : Promise<Group> {
        return this.groups.get(groupID)!;
    }

    // Get all Group Members
    async groupMembers(groupID: string) : Promise<Set<string>> {
        const group : Group = this.groups.get(groupID)!;
        return group.members();
    }

    // Check if user is a member of group
    async isGroupMember(groupID : string, user : string) : Promise<boolean> {
        if (!this.groups.has(groupID)) {
            return false;
        }

        const group : Group = this.groups.get(groupID)!;
        return group.isMember(user);
    }

    // Change group Host
    async changeGroupHost(groupID : string, currHost : string, newHost : string) : Promise<boolean> {
        if (!this.groups.has(groupID)) {
            return false;
        }

        const group : Group = this.groups.get(groupID)!;
        group.newOwner(currHost, newHost);
        this.groups.set(groupID, group);
        return true;
    }

}

export function makeRestaurantService() : IGroupService {
    return new GroupService();
}