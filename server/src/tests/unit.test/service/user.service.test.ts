import {conn} from "../../../db/model/conn";
import {IUserService} from "../../../service/user.interface";
import {makeUserService} from "../../../db/service/user.service";
import {userModel} from "../../../db/model/user";
import {restaurantModel} from "../../../db/model/restaurants";
import {Restaurants} from "../../../model/restaurants";
import {restaurantService} from "../../../router/restaurant.router";

describe("UserService Test", () => {

  const id : string = "testuser";
  const password : string = "testpassword";

  const restaurantID : string = "1";
  const name : string = "Pizza Place";
  const imageUrl : string = "https://example.com/pizza.jpg";
  let userService : IUserService;

  beforeAll(async () => {
    userService = makeUserService();
  });

  beforeEach(async () => {
    await conn.collection('users').deleteMany({});
    await conn.collection('restaurants').deleteMany({});
  });

  afterEach(async () => {
    await conn.collection('restaurants').deleteMany({});
    await conn.collection('users').deleteMany({});
    await conn.collection('groups').deleteMany({});
  });

  afterAll(async () => {
    await conn.close();
  });


  describe("registerUser", () => {
    it("Should return true on successfully creating a new user", async () => {
      const success = await userService.registerUser(id, password);
      expect(success).toBe(true);

      const user = await userModel.findOne({ id: id });
      expect(user).not.toBeNull();
      expect(user!.password).toBe(password);
    });

    it("should return false on trying to create a user that already exists", async () => {
      await userModel.create({
        id : id,
        password : password,
        liked : [],
        disliked : []
      });

      const success = await userService.registerUser(id, password);
      expect(success).toBe(false);
      const user = await userModel.findOne({ id: id });
      expect(user).not.toBeNull();
    });
  });

  describe("checkUser", () => {
    it("Should return true if user exists", async () => {
      await userModel.create({
        id : id,
        password : password,
        liked : [],
        disliked : []
      });

      const exists = await userService.checkUser(id);
      expect(exists).toBe(true);
    });

    it("Should return false if user doesn't exist", async () => {
      const exists = await userService.checkUser(id);
      expect(exists).toBe(false);
    });
  });

  describe("findUser", () => {
    it("Should return user if it exists", async () => {
      await userModel.create({
        id : id,
        password : password,
        liked : [],
        disliked : []
      });

      const user = await userService.findUser(id);
      expect(user).not.toBeUndefined();
      expect(user!.id).toBe(id);
      expect(user.password).toBe(password);
    });

    it("Should return undefined if user doesn't exist", async () => {
      const user = await userService.findUser(id);
      expect(user).toBeUndefined();
    });

  });

  describe("likeRestaurant", () => {
    it("Should add restaurant to users liked array", async () => {
      await userModel.create({
        id: id,
        password: password,
        liked: [],
        disliked: []
      });

      const restaurant = await restaurantModel.create({
        id: restaurantID,
        name: name,
        imageUrl: imageUrl
      });

      const completed = await userService.likeRestaurant(id, restaurant);
      expect(completed).toBe(true);

      const user = await userModel.findOne({id: id}).populate('liked');
      const liked = user!.liked;
      expect(liked.length).toBe(1);
      const restaurant1 = liked.pop();
      expect(restaurant1).not.toBeUndefined();
      expect(restaurant1!.id).toBe(restaurantID);

    });

    it("Should add restaurant to users liked array and remove from disliked", async () => {
      const restaurant = await restaurantModel.create({
        id: restaurantID,
        name: name,
        imageUrl: imageUrl
      });

      await userModel.create({
        id: id,
        password: password,
        liked: [],
        disliked: [restaurant]
      });


      const completed = await userService.likeRestaurant(id, restaurant);
      expect(completed).toBe(true);

      const user = await userModel.findOne({id: id}).populate('liked').populate('disliked');
      const liked = user!.liked;
      const disliked = user!.disliked;
      expect(liked.length).toBe(1);
      expect(disliked.length).toBe(0);
      const restaurant1 = liked.pop();
      expect(restaurant1).not.toBeUndefined();
      expect(restaurant1!.id).toBe(restaurantID);
    });
  });

  describe("dislikeRestaurant", () => {
    it("Should add restaurant to users disliked array", async () => {
      await userModel.create({
        id: id,
        password: password,
        liked: [],
        disliked: []
      });

      const restaurant = await restaurantModel.create({
        id: restaurantID,
        name: name,
        imageUrl: imageUrl
      });

      const completed = await userService.dislikeRestaurant(id, restaurant);
      expect(completed).toBe(true);

      const user = await userModel.findOne({id: id}).populate('disliked');
      const disliked = user!.disliked;
      expect(disliked.length).toBe(1);
      const restaurant1 = disliked.pop();
      expect(restaurant1).not.toBeUndefined();
      expect(restaurant1!.id).toBe(restaurantID);
    });

    it("Should add restaurant to users disliked array and remove from liked", async () => {
      const restaurant = await restaurantModel.create({
        id: restaurantID,
        name: name,
        imageUrl: imageUrl
      });

      await userModel.create({
        id: id,
        password: password,
        liked: [restaurant],
        disliked: []
      });

      const completed = await userService.dislikeRestaurant(id, restaurant);
      expect(completed).toBe(true);

      const user = await userModel.findOne({id: id}).populate('disliked').populate('liked');
      const disliked = user!.disliked;
      const liked = user!.liked;
      expect(disliked.length).toBe(1);
      expect(liked.length).toBe(0);
      const restaurant1 = disliked.pop();
      expect(restaurant1).not.toBeUndefined();
      expect(restaurant1!.id).toBe(restaurantID);
    });

  });

  describe("getLikedRestaurants", () => {
    it("Should return a set of all liked restaurants", async () => {
      const restaurant = await restaurantModel.create({
        id: restaurantID,
        name: name,
        imageUrl: imageUrl
      });

      await userModel.create({
        id: id,
        password: password,
        liked: [restaurant],
        disliked: []
      });

      const restaurants = await userService.getLikedRestaurants(id);
      expect(restaurants.size).toBe(1);
    });

    it("Should return an empty Set for a user with no likes", async () => {
      const empty : Set<Restaurants> = new Set<Restaurants>();
      const liked : Set<Restaurants> = await userService.getLikedRestaurants(id);
      expect(liked).toMatchObject(empty);
    });
  });

  describe("getDislikedRestaurants", () => {
    it("Should return a set of all disliked restaurants", async () => {
      const restaurant = await restaurantModel.create({
        id: restaurantID,
        name: name,
        imageUrl: imageUrl
      });

      await userModel.create({
        id: id,
        password: password,
        liked: [],
        disliked: [restaurant]
      });

      const restaurants = await userService.getDislikedRestaurants(id);
      expect(restaurants.size).toBe(1);
    });

    it("Should return an empty Set for a user with no dislikes", async () => {
      const empty : Set<Restaurants> = new Set<Restaurants>();
      const disliked : Set<Restaurants> = await userService.getLikedRestaurants(id);
      expect(disliked).toMatchObject(empty);
    });
  });

});

