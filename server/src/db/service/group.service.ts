import {groupModel} from "../model/group";
import { Group } from "../../model/group";
import {User} from "../../model/user";
import { IGroupService} from "../../service/group.interface";
import {userModel} from "../model/user";


class GroupService implements IGroupService {
    groups : Map<string,Group> = new Map<string, Group>();

    // Create New Group
    async createGroup(user : User, groupID : string, password : string) : Promise<boolean> {
        if (await groupModel.exists({id : groupID})) {
            return false;
        }

        await groupModel.create({
            id : groupID,
            host : user,
            password : password,
            users : []
        });

        await groupModel.updateOne({id: groupID}, {$addToSet: {users: user}});
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
        let members : Set<User>;
        const group : Group | null = await groupModel.findOne({id : groupID});
        if (group == null) {
            console.log("GroupMembers Method failed ------------------->");
            return members = new Set<User>();
        }

        console.log(" ----------   ");
        members = new Set<User>();
        for (let i = 0; i < group.users.length; i++) {
            let user = await userModel.findById(group.users[i]);
            if (user != null) {
                members.add(user);
            }
        }
        return members;
    }

    // Check if user is a member of group
    async isGroupMember(groupID : string, user : User) : Promise<boolean> {
        if (await groupModel.exists({ id: groupID, users: user })) {
            return true;
        }
        return false;
    }

}

export function makeGroupService() : IGroupService {
    return new GroupService();
}