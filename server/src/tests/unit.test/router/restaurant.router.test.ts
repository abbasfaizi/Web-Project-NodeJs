import * as SuperTest from "supertest";
import { app } from "../../../start";
import {conn} from "../../../db/model/conn";
import {User} from "../../../model/user";
//const request = SuperTest.default(app);
const session = require('supertest-session');
let request = session(app);

describe('RestaurantRouter Test', () => {

    const rid : string = "example_restaurant";
    const user = {
        userid : "testuser",
        password : "testpassword"
    };

    beforeEach(async () => {
        await conn.collection('users').deleteMany({});
    });

    afterEach(async () => {
        await conn.collection('users').deleteMany({});
    });


    describe("GET /", () => {
        it("should return 401 if user is not logged in", async () => {
            const response = await request.get("/restaurant");
            expect(response.statusCode).toBe(401);
        });
    });

    describe("GET /:rid", () => {
        it("should return 401 if user is not logged in", async () => {
            const response = await request.get("/restaurant" + rid);
            expect(response.statusCode).toBe(401);
        });

        it("should return 404 if restaurant doesn't exist", async () => {
            await request.post("/user/register").send(user);
            await request.post("/user/login").send(user);

            const response = await request.get("/restaurant/)" + rid);
            expect(response.statusCode).toBe(404);
        });
    });

});
