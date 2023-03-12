import {User} from "../../model/user";
import {makeRestaurantService} from "../../db/service/restaurant.service";
import {makeGroupService} from "../../db/service/group.service";
import {conn} from "../../db/model/conn";
import {makeUserService} from "../../db/service/user.service";

describe('GroupService', () => {

  const groupService = makeGroupService();
  const userService = makeUserService();

  let user : User;
  let user2 : User;
  let groupID: string;
  let password: string;

  beforeAll(async () => {
      await conn.collection('restaurants').deleteMany({});
      await conn.collection('users').deleteMany({});
      await conn.collection('groups').deleteMany({});
    });

  afterAll(async () => {
      await conn.close();
  });

    it('should create a new group', async () => {
      let userResult = await userService.registerUser('test-user-1', 'password');
      user = await userService.findUser("test-user-1");
      groupID = 'test-group-1';
      password= 'group-password';

      // @ts-ignore
      const result: boolean = await groupService.createGroup(user, groupID, password, "Lindholmen 4", []);

      expect(result).toBe(true);
      expect(await groupService.isGroup(groupID)).toBe(true);
      expect(await groupService.getGroup(groupID)).toBeDefined();
    });

    it('should allow a user to join a group', async () => {
      let result2 = await userService.registerUser('test-user-2', 'password');
      user2 = await userService.findUser("test-user-2");

      const result: boolean = await groupService.joinGroup(user2, groupID, password);
      expect(result).toBe(true);
      expect(await groupService.isGroupMember(groupID, user2)).toBe(true);
    });

    it('should not allow a user to join a non-existent group', async () => {
      const result: boolean = await groupService.joinGroup(user,'non-existent-group', "non-password");
      expect(result).toBe(false);
    });
});
  // add more tests for other methods

