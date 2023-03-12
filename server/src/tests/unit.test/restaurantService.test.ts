
import {IRestaurantService} from "../../service/restaurant.interface";
import {makeRestaurantService} from "../../db/service/restaurant.service";
import {conn} from "../../db/model/conn";

describe("RestaurantService", () => {

    const restaurantService = makeRestaurantService();

    beforeEach(async () => {
        await conn.collection('restaurants').deleteMany({});
        await conn.collection('users').deleteMany({});
        await conn.collection('groups').deleteMany({});

    });

    afterAll(async () => {
        await conn.close();
    });

    it("should create a new restaurant", async () => {
      const result = await restaurantService.createRestaurant("1", "Pizza Place", "https://example.com/pizza.jpg");
      expect(result).toBe(true);
    });

    it("should return false if restaurant with same ID already exists", async () => {
      await restaurantService.createRestaurant("1", "Pizza Place", "https://example.com/pizza.jpg");
      const result = await restaurantService.createRestaurant("1", "Burger Joint", "https://example.com/burger.jpg");
      expect(result).toBe(false);
    });

    it("should return true if restaurant with given ID exists", async () => {
      await restaurantService.createRestaurant("1", "Pizza Place", "https://example.com/pizza.jpg");
      const result = await restaurantService.checkRestaurant("1");
      expect(result).toBe(true);
    });

    it("should return false if restaurant with given ID doesn't exist", async () => {
      const result = await restaurantService.checkRestaurant("should-not-exist");
      expect(result).toBe(false);
    });

    it("should return the correct restaurant for the given ID", async () => {
      await restaurantService.createRestaurant("1", "Pizza Place", "https://example.com/pizza.jpg");
      const result = await restaurantService.getRestaurant("1");
      expect(result.id).toBe("1");
      expect(result.name).toBe("Pizza Place");
      expect(result.imageUrl).toBe("https://example.com/pizza.jpg");
    });

    it("should return all stored restaurants", async () => {
      await restaurantService.createRestaurant("1", "Pizza Place", "https://example.com/pizza.jpg");
      await restaurantService.createRestaurant("2", "Burger Joint", "https://example.com/burger.jpg");
      const result = await restaurantService.getRestaurants();
      expect(result.size).toBe(2);
      expect(result.get("1")).toBeDefined();
      expect(result.get("2")).toBeDefined();
    });
});
