import {conn} from "../../db/model/conn";
import {makeGroupService} from "../../db/service/group.service";
import {IGroupService} from "../../service/group.interface";
import {User} from "../../model/user";
import {Restaurants} from "../../model/restaurants";
import {groupModel} from "../../db/model/group";
import {userModel} from "../../db/model/user";
import {restaurantModel} from "../../db/model/restaurants";


describe('GroupService Test', () => {

  const groupID: string = "test-group";
  const password: string = "test";
  const location: string = "Lindholmen 4";

  let user1: User;
  let user2: User;
  const u1ID : string = "user1";
  const u2ID : string = "user2";

  let rest1: Restaurants;
  let rest2: Restaurants;
  const r1ID: string = "1";
  const r2ID: string = "2";
  const r1Name : string = "Subway";
  const r2Name : string = "Pizza Place";
  const imageUrl : string = "https://example.com/pizza.jpg";

  let groupService : IGroupService;

  beforeAll(async () => {
    groupService = makeGroupService();
  });

  beforeEach(async () => {
    await conn.collection('restaurants').deleteMany({});
    await conn.collection('users').deleteMany({});
    await conn.collection('groups').deleteMany({});

    rest1 = await restaurantModel.create({
      id: r1ID,
      name: r1Name,
      imageUrl: imageUrl,
    });

    rest2 = await restaurantModel.create({
      id: r2ID,
      name: r2Name,
      imageUrl: imageUrl,
    });


    user1 = await userModel.create({
      id: u1ID,
      password: password,
      // @ts-ignore
      liked: [], disliked: []
    });

    user2 = await userModel.create({
      id: u2ID,
      password: password,
      // @ts-ignore
      liked: [], disliked: []
    });

  });

  afterEach(async () => {
    await conn.collection('restaurants').deleteMany({});
    await conn.collection('users').deleteMany({});
    await conn.collection('groups').deleteMany({});
  });


  afterAll(async () => {
    await conn.close();
  });

  describe("createGroup", () => {
    it("Should return true if group created successfully", async () => {
      const success = await groupService.createGroup(user1, groupID, password, location, []);
      expect(success).toBe(true);

      const group = await groupModel.findOne({id: groupID});
      expect(group).not.toBe(null);
      expect(group!.id).toBe(groupID);

    });

    it("Should return false if group already exists", async () => {
      await groupModel.create({
        id: groupID,
        host: user1,
        password: password,
        location: location,
        users: [user1],
        restaurants: []
      });

      const success = await groupService.createGroup(user1, groupID, password, location, []);
      expect(success).toBe(false);
    });
  });

  describe("joinGroup", () => {
    it("Should return true if joined group successfully", async () => {
      await groupModel.create({
        id: groupID,
        host: user1,
        password: password,
        location: location,
        users: [user1],
        restaurants: []
      });

      const success = await groupService.joinGroup(user2, groupID, password);
      expect(success).toBe(true);

      const group = await groupModel.findOne({id:groupID, users: user2});
      expect(group).not.toBeNull();
      expect(group!.id).toBe(groupID);
    });

    it("Should return false if group doesn't exist", async () => {
      const success = await groupService.joinGroup(user2, groupID, password);
      expect(success).toBe(false);

      const group = await groupModel.findOne({id:groupID, users: user2});
      expect(group).toBeNull();
    });
  });

  describe("isGroup", () => {
    it("Should return true if group exists", async () => {
      await groupModel.create({
        id: groupID,
        host: user1,
        password: password,
        location: location,
        users: [user1],
        restaurants: []
      });

      const exists = await groupService.isGroup(groupID);
      expect(exists).toBe(true);

      const group = await groupModel.findOne({id:groupID});
      expect(group).not.toBeNull();
      expect(group!.id).toBe(groupID);
    });

    it("Should return false if group doesn't exist", async () => {
      const exists = await groupService.isGroup(groupID);
      expect(exists).toBe(false);

      const group = await groupModel.findOne({id:groupID});
      expect(group).toBeNull();
    });
  });

  describe("isGroupMember", () => {
    it("Should return true if member of group", async () => {
      await groupModel.create({
        id: groupID,
        host: user1,
        password: password,
        location: location,
        users: [user1, user2],
        restaurants: []
      });

      const isMember1 = await groupService.isGroupMember(groupID, user1);
      expect(isMember1).toBe(true);

      const isMember2 = await groupService.isGroupMember(groupID, user2);
      expect(isMember2).toBe(true);

      const group = await groupModel.findOne({id:groupID, users: user2});
      expect(group).not.toBeNull();
    });

    it("Should return false if not member of group", async () => {
      await groupModel.create({
        id: groupID,
        host: user1,
        password: password,
        location: location,
        users: [user1],
        restaurants: []
      });

      const isMember2 = await groupService.isGroupMember(groupID, user2);
      expect(isMember2).toBe(false);

      const group = await groupModel.findOne({id:groupID, users: user2});
      expect(group).toBeNull();
    });
  });

  describe("findMostLikedRestaurant", () => {
    it("Should return the most liked restaurant in group if there's one", async () => {
      await groupModel.create({
        id: groupID,
        host: user1,
        password: password,
        location: location,
        users: [user1, user2],
        restaurants: [rest1, rest2]
      });


      await userModel.updateOne({id: user1.id}, {$addToSet: {liked: rest1}});
      await userModel.updateOne({id: user1.id}, {$addToSet: {liked: rest2}});

      await userModel.updateOne({id: user2.id}, {$addToSet: {disliked: rest2}});
      await userModel.updateOne({id: user2.id}, {$addToSet: {liked: rest2}});


      const mostLiked = await groupService.findMostLikedRestaurant(groupID);
      expect(mostLiked).not.toBeNull();
      expect(mostLiked!.id).toBe(rest2.id);

    });

    it("Should return null if there is no liked restaurant in group or no restaurants in group", async () => {
      await groupModel.create({
        id: groupID,
        host: user1,
        password: password,
        location: location,
        users: [user1, user2],
        restaurants: [rest1, rest1]
      });

      const mostLiked = await groupService.findMostLikedRestaurant(groupID);
      expect(mostLiked).toBeNull();
    });
  });

  describe("getRestaurantsForUser", () => {
    it("Should return all the restaurants in users group that they haven't liked/disliked", async () => {});

  });



});


