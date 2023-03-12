/*

describe('GroupService', () => {
  let groupService: GroupService;

  beforeEach(() => {
    groupService = new GroupService();
  });

  describe('createGroup', () => {
    it('should create a new group', async () => {
      const user: MUser = new MUser('testuser', 'password');
      const groupID: string = 'testgroup';
      const password: string = 'grouppassword';

      const result: boolean = await groupService.createGroup(user, groupID, password);

      expect(result).toBe(true);
      expect(groupService.groups.size).toBe(1);
      expect(groupService.groups.get(groupID)).toBeDefined();
    //  expect(groupService.groups.get(groupID)?.groupID).toBe(groupID);
      expect(groupService.groups.get(groupID)?.password).toBe(password);
    });
  });

  describe('joinGroup', () => {
    let user: MUser;
    let groupID: string;
    let password: string;

    beforeEach(async () => {
      user = new MUser('testuser', 'password');
      groupID = 'testgroup';
      password = 'grouppassword';

      await groupService.createGroup(user, groupID, password);
    });

    it('should allow a user to join a group', async () => {
      const result: boolean = await groupService.joinGroup(user, groupID);

      expect(result).toBe(true);
      expect(groupService.groups.get(groupID)?.users).toContain(user);
    });

    it('should not allow a user to join a non-existent group', async () => {
      const result: boolean = await groupService.joinGroup(user, 'nonexistentgroup');

      expect(result).toBe(false);
      expect(groupService.groups.get(groupID)?.users).not.toContain(user);
    });
  });
  // add more tests for other methods
});
 */

