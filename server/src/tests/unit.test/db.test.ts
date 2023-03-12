import mongoose, {createConnection} from "mongoose";
import {conn} from "../../db/model/conn";
import {restaurantService} from "../../router/restaurant.router";

describe("test-db", () => {

    beforeAll(async () => {
        await conn.collection('restaurants').deleteMany({});
        await conn.collection('users').deleteMany({});
        await conn.collection('groups').deleteMany({});

    });

    afterAll(async () => {
        await conn.close();
    });

    test('should add a new user to the users map', async () => {

        await restaurantService.createRestaurant("test1", "a", "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
        await restaurantService.createRestaurant("test2", "b", "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
        await restaurantService.createRestaurant("test3", "c", "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
        await restaurantService.createRestaurant("test4", "d", "https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");


        return true;
    });

});