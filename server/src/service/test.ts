


//This test suite covers the getRestaurants, getRestaurant, addRestaurant, and checkRestaurant methods of the RestaurantService class, and ensures that they behave as expected.
import { Restaurants } from "../model/restaurants";
import { IRestaurantService, makeRestaurantService } from "./restaurant.service";

describe("RestaurantService", () => {
  let restaurantService: IRestaurantService;

  beforeEach(() => {
    restaurantService = makeRestaurantService();
  });

  describe("getRestaurants", () => {
    it("returns an empty Map when no restaurants have been added", async () => {
      const restaurants = await restaurantService.getRestaurants();
      expect(restaurants.size).toBe(0);
    });

    it("returns a Map with one restaurant when one restaurant has been added", async () => {
      const restaurant: Restaurants = new Restaurants(1, "Test Restaurant", "http://test.com/image.jpg");
      await restaurantService.addRestaurant(restaurant);
      const restaurants = await restaurantService.getRestaurants();
      expect(restaurants.size).toBe(1);
      expect(restaurants.get(1)).toEqual(restaurant);
    });
  });

  describe("getRestaurant", () => {
    it("throws an error when the restaurant is not found", async () => {
      await expect(restaurantService.getRestaurant(1)).rejects.toThrow();
    });

    it("returns the correct restaurant when the restaurant is found", async () => {
      const restaurant: Restaurants = new Restaurants(1, "Test Restaurant", "http://test.com/image.jpg");
      await restaurantService.addRestaurant(restaurant);
      const result = await restaurantService.getRestaurant(1);
      expect(result).toEqual(restaurant);
    });
  });

  describe("addRestaurant", () => {
    it("adds a restaurant to the Map and returns the same restaurant", async () => {
      const restaurant: Restaurants = new Restaurants(1, "Test Restaurant", "http://test.com/image.jpg");
      const result = await restaurantService.addRestaurant(restaurant);
      const restaurants = await restaurantService.getRestaurants();
      expect(restaurants.size).toBe(1);
      expect(restaurants.get(1)).toEqual(restaurant);
      expect(result).toEqual(restaurant);
    });
  });

  describe("checkRestaurant", () => {
    it("returns false when the restaurant is not found", async () => {
      const result = await restaurantService.checkRestaurant(1);
      expect(result).toBe(false);
    });

    it("returns true when the restaurant is found", async () => {
      const restaurant: Restaurants = new Restaurants(1, "Test Restaurant", "http://test.com/image.jpg");
      await restaurantService.addRestaurant(restaurant);
      const result = await restaurantService.checkRestaurant(1);
      expect(result).toBe(true);
    });
  });
});
