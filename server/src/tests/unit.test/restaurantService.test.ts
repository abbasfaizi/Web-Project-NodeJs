import {IRestaurantService} from "../../service/restaurant.interface";
import {makeRestaurantService} from "../../db/service/restaurant.service";
import {conn} from "../../db/model/conn";
import {restaurantModel} from "../../db/model/restaurants";

describe("RestaurantService Test", () => {

    const id : string = "1";
    const name : string = "Pizza Place";
    const imageUrl : string = "https://example.com/pizza.jpg";
    let restaurantService : IRestaurantService;

    beforeAll(async () => {
        restaurantService = makeRestaurantService();
    });

    beforeEach(async () => {
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


    describe("createRestaurant", () => {
        it("Should return true on successfully creating a new restaurant", async () => {
            const success = await restaurantService.createRestaurant(id, name, imageUrl);
            expect(success).toBe(true);

            const restaurant = await restaurantModel.findOne({ id: id });
            expect(restaurant).not.toBeNull();
            expect(restaurant!.name).toBe(name);
            expect(restaurant!.imageUrl).toBe(imageUrl);
        });

        it("Should return false on trying to create a restaurant that already exists", async () => {
            await restaurantModel.create({
                id: id,
                name: name,
                imageUrl: imageUrl,
            });

            const success = await restaurantService.createRestaurant(id, name, imageUrl);
            expect(success).toBe(false);
            const restaurant = await restaurantModel.findOne({ id: id });
            expect(restaurant).not.toBeNull();
        });
    });

    describe("checkRestaurant", () => {
        it("Should return true if restaurant exists", async () => {
            await restaurantModel.create({
                id: id,
                name: name,
                imageUrl: imageUrl,
            });

            const exists = await restaurantService.checkRestaurant(id);
            expect(exists).toBe(true);
        });

        it("Should return false if restaurant doesn't exist", async () => {
            const exists = await restaurantService.checkRestaurant(id);
            expect(exists).toBe(false);
        });
    });

    describe("getRestaurant", () => {
        it("Should return restaurant if it exists", async () => {
            await restaurantModel.create({
                id: id,
                name: name,
                imageUrl: imageUrl,
            });

            const restaurant = await restaurantService.getRestaurant(id);
            expect(restaurant).not.toBeUndefined();
            expect(restaurant.id).toBe(id);
            expect(restaurant.name).toBe(name);
            expect(restaurant.imageUrl).toBe(imageUrl);
        });

        it("Should return undefined if restaurant doesn't exist", async () => {
            const restaurant = await restaurantService.getRestaurant(id);
            expect(restaurant).toBeUndefined();
        });

    });

});
