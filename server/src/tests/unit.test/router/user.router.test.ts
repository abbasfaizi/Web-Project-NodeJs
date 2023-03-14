import * as SuperTest from "supertest";
import { app } from "../../../start";
import {conn} from "../../../db/model/conn";
//const request = SuperTest.default(app);

const session = require('supertest-session');
const request = session(app);

describe('UserRouter Test', () => {

    const id : string = "testuser";
    const password : string = "testpassword";
    const password_incorrect : string = "incorrecttespassword";
    const example_restaurant_id : string = "df5f5vf5v5v5sdvdf";

    beforeEach(async () => {
        await conn.collection('users').deleteMany({});
    });

    afterEach(async () => {
        await conn.collection('users').deleteMany({});
    });


    describe("GET /likes", () => {
        it("should return 401 if user is not logged in", async () => {
            const response = await request.get("/user/likes");
            expect(response.statusCode).toBe(401);
        });
    });


    describe("GET /dislikes", () => {
        it("should return 400 if user is not logged in", async () => {
            const response = await request.get("/user/dislikes");
            expect(response.statusCode).toBe(401);
        });
    });


    describe("POST /register", () => {
        it("should return 400 if id isn't string/null", async () => {
            const response = await request.post("/user/register").send({password : password});
            expect(response.statusCode).toBe(400);
        });

        it("should return 400 if password isn't string/null", async () => {
            const response = await request.post("/user/register").send({userid : id});
            expect(response.statusCode).toBe(400);
        });

        it("should return 409 if username is taken", async () => {
            await request.post("/user/register").send({userid : id, password : password});

            const response = await request.post("/user/register").send({
                userid : id, password : password});
            expect(response.statusCode).toBe(409);
        });
    });

    describe("POST /login", () => {
        it("should return 400 if id isn't string/null", async () => {
            const response = await request.post("/user/login").send({password : password});
            expect(response.statusCode).toBe(400);
        });

        it("should return 400 if password isn't string/null", async () => {
            const response = await request.post("/user/login").send({userid : id});
            expect(response.statusCode).toBe(400);
        });

        it("should return 401 if user is not registered", async () => {
            const response = await request.post("/user/login").send({
                userid : id, password : password});
            expect(response.statusCode).toBe(401);
        });

        it("should return 401 if incorrect password", async () => {
            await request.post("/user/register").send({userid : id, password : password});

            const response = await request.post("/user/login").send({
                userid : id, password : password_incorrect});
            expect(response.statusCode).toBe(401);
        });

    });


    describe("POST /logout", () => {
        it("should return 401 if user isn't logged in", async () => {
            const response = await request.delete("/user/logout");
            expect(response.statusCode).toBe(401);
        });
    });


    describe("PUT /:rid", () => {
        it("should return 401 if user is not logged in", async () => {
            const response = await request.put("/user/" + example_restaurant_id);
            expect(response.statusCode).toBe(401);
        });

        it("Should return 400 if operation is not string or is null ", async () => {
            await request.post("/user/register").send({userid: id, password: password});
            await request.post("/user/login").send({userid: id, password: password});

            const response = await request.put("/user/" + example_restaurant_id);
            expect(response.statusCode).toBe(400);
        });

        it("Should return 400 if operation isn't set to either like or dislike", async () => {
            await request.post("/user/register").send({userid: id, password: password});
            await request.post("/user/login").send({userid: id, password: password});

            const response = await request.put("/user/" + example_restaurant_id).send({operation: "invalid"});
            expect(response.statusCode).toBe(400);
        });

        it("Should return 404 if reestaurant doesn't exist", async () => {
            await request.post("/user/register").send({userid: id, password: password});
            await request.post("/user/login").send({userid: id, password: password});

            const response = await request.put("/user/" + example_restaurant_id).send({operation: "like"});
            expect(response.statusCode).toBe(404);
        });

    });
});
