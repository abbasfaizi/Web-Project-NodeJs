import {app} from "../../start";
import {conn} from "../../db/model/conn";
import {User} from "../../model/user";
import {Group} from "../../model/group";
import {Restaurants} from "../../model/restaurants";
import {restaurantModel} from "../../db/model/restaurants";
import {userModel} from "../../db/model/user";
import {groupModel} from "../../db/model/group";

const session = require('supertest-session');
let request = session(app);

describe('Integration Test', () => {


    const user = {userid: "user1", password: "password"};
    let user2 : User;

    const group4create = {id: "group4create", password: "password1", location: "London"};
    let group4join: Group;

    let rest1: Restaurants;
    let rest2: Restaurants;

    beforeAll(async () => {
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


    });

    afterAll(async () => {
        await conn.collection('restaurants').deleteMany({});
        await conn.collection('users').deleteMany({});
        await conn.collection('groups').deleteMany({});
    });


    it("User registers an account", async () => {
        const response = await request.post("/user/register").send(user);
        expect(response.statusCode).toBe(201);
    });


    it("User logs in", async () => {
        const response = await request.post("/user/login").send(user);
        expect(response.statusCode).toBe(200);
    });

    it("User creates group", async () => {
        const response = await request.post("/group/create").send(group4create);
        expect(response.statusCode).toBe(201);
    });


    it("User joins group", async () => {
        const response = await request.post("/group/join").send({id: group4join.id, password: group4join.password});
        expect(response.statusCode).toBe(201);
    });

    it("User gets restaurants from group/groups", async () => {
        const response = await request.get("/restaurant");
        expect(response.statusCode).toBe(200);
    });

    it("user likes restaurant", async () => {
        const response = await request.put("/user/" + rest1.id).send({operation: "like"});
        expect(response.statusCode).toBe(200);
    });

    it("User dislikes restaurant", async () => {
        const response = await request.put("/user/" + rest2.id).send({operation: "dislike"});
        expect(response.statusCode).toBe(200);
    });

    it("User finds most liked restaurant in a group", async () => {
        const response = await request.get("/group/" + group4join.id);
        expect(response.statusCode).toBe(200);

        expect(response.body.id).toBe(rest1.id);
    });


});