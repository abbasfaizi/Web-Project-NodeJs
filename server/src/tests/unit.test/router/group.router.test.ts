import * as SuperTest from "supertest";
import { app } from "../../../start";
import {conn} from "../../../db/model/conn";
import {groupModel} from "../../../db/model/group";
import {userModel} from "../../../db/model/user";
import {Group} from "../../../model/group";
import {User} from "../../../model/user";
import {Restaurants} from "../../../model/restaurants";
import {restaurantModel} from "../../../db/model/restaurants";
//const request = SuperTest.default(app);
const session = require('supertest-session');
let request = session(app);

describe('GroupRouter Test', () => {

    const user1 = {userid: "user1", password: "password"};
    let user2: User;

    const group4create = {id: "group4create", password: "password1", location: "London"};
    let group4join: Group;

    let rest1: Restaurants;
    let rest2: Restaurants;


    beforeEach(async () => {
        await conn.collection('restaurants').deleteMany({});
        await conn.collection('users').deleteMany({});
        await conn.collection('groups').deleteMany({});

        rest1 = await restaurantModel.create({
            id: "1",
            name: "rest1",
            imageUrl: "test.jpg",
        });

        rest2 = await restaurantModel.create({
            id: "2",
            name: "rest2",
            imageUrl: "test.jgp",
        });

        user2 = await userModel.create({
            id: "user2",
            password: "password",
            liked: [],
            disliked: []
        });

        group4join = await groupModel.create({
            id: "group4join",
            host: user2,
            password: "password2",
            location: "London",
            users: [user2],
            restaurants: [rest1, rest2]
        });


        await request.post("/user/register").send(user1);
        await request.post("/user/login").send(user1);
    });

    afterEach(async () => {
        await conn.collection('restaurants').deleteMany({});
        await conn.collection('users').deleteMany({});
        await conn.collection('groups').deleteMany({});
    });

    describe("GET /:group", () => {
        it("should return 401 if user is not logged in", async () => {
            await request.delete("/user/logout");
            const response = await request.get("/group/" + group4create.id);
            expect(response.statusCode).toBe(401);
        });

        it("should return 404 if group doesn't exist", async () => {
            const response = await request.get("/group/" + group4create.id);
            expect(response.statusCode).toBe(404);
        });

        it("should return 401 if user is not a member of group", async () => {
            // @ts-ignore
            const response = await request.get("/group/" + group4join.id);
            expect(response.statusCode).toBe(401);
        });

        it("should return 404 if none of groups restaurants have been liked by members", async () => {
            await request.delete("/user/logout");
            await request.post("/user/login").send({userid: user2.id, password: user2.password});

            // @ts-ignore
            const response = await request.get("/group/" + group4join.id);
            expect(response.statusCode).toBe(404);
        });
    });

    describe("GET /create", () => {

        it("should return 401 if user is not logged in", async () => {
            await request.delete("/user/logout");
            const response = await request.post("/group/create");
            expect(response.statusCode).toBe(401);
        });

        it("should return 400 if id is not set or string", async () => {
            const response = await request.post("/group/create").send({password: group4create.password,
                                                                 location: group4create.location});
            expect(response.statusCode).toBe(400);
        });

        it("should return 400 if password is not set or string", async () => {
            const response = await request.post("/group/create").send({id: group4create.id,
                                                                 location: group4create.location});
            expect(response.statusCode).toBe(400);
        });

        it("should return 400 if location is not set or string", async () => {
            const response = await request.post("/group/create").send({id: group4create.id,
                                                                 password: group4create.password});
            expect(response.statusCode).toBe(400);
        });

        it("should return 409 if group id is already taken", async () => {
            const response = await request.post("/group/create").send({id: group4join.id,
                                                                       password: group4create.password,
                                                                       location: group4create.location});
            expect(response.statusCode).toBe(409);
        });

    });

    describe("POST /join", () => {

        it("should return 401 if user is not logged in", async () => {
            await request.delete("/user/logout");
            const response = await request.post("/group/join");
            expect(response.statusCode).toBe(401);
        });

        it("should return 400 if id is not set or string", async () => {
            const response = await request.post("/group/join").send({password: group4join.password});
            expect(response.statusCode).toBe(400);
        });

        it("should return 400 if password is not set or string", async () => {
            const response = await request.post("/group/join").send({id: group4join.id});
            expect(response.statusCode).toBe(400);
        });

        it("should return 404 if group doesn't exist", async () => {
            const response = await request.post("/group/join").send({id: group4create.id, password: group4create.password});
            expect(response.statusCode).toBe(404);
        });

        it("should return 400 if already a member of group", async () => {
            await request.delete("/user/logout");
            await request.post("/user/login").send({userid: user2.id, password: user2.password});

            const response = await request.post("/group/join").send({id: group4join.id, password: group4join.password});
            expect(response.statusCode).toBe(400);
        });

        it("should return 401 if wrong password", async () => {
            const response = await request.post("/group/join").send({id: group4join.id, password: group4create.password});
            expect(response.statusCode).toBe(401);
        });
    });

});

