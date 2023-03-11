import request from "supertest";
import express, { Request, Response } from "express";
import session from "express-session";
import { defaultRouter } from "../../router/default.router";

describe("defaultRouter", () => {
  let app: express.Application;
  const mockSession = {
    user: {
      id: 1,
      username: "testuser",
      email: "testuser@test.com",
    },
  };

  beforeAll(() => {
    app = express();
    app.use(
      session({
        secret: "test",
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 3600000,
        },
      })
    );
    app.use(defaultRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if user is not logged in", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(401);
  });

  it("should return 404 for wrong page", async () => {
    const response = await request(app)
      .get("/wrong-page")
      .set("Cookie", [`connect.sid=${Math.random().toString(36).slice(2)}`])
      .set("Content-Type", "application/json");
    expect(response.status).toBe(404);
  });

  it("should return 404 for GET request", async () => {
    const response = await request(app)
      .get("/api/user")
      .set("Cookie", [`connect.sid=${Math.random().toString(36).slice(2)}`])
      .set("Content-Type", "application/json");
    expect(response.status).toBe(404);
  });

  it("should return 404 for POST request", async () => {
    const response = await request(app)
      .post("/api/user")
      .set("Cookie", [`connect.sid=${Math.random().toString(36).slice(2)}`])
      .set("Content-Type", "application/json")
      .send({ username: "testuser", password: "testpassword" });
    expect(response.status).toBe(404);
  });

  it("should return 404 for PUT request", async () => {
    const response = await request(app)
      .put("/api/user/1")
      .set("Cookie", [`connect.sid=${Math.random().toString(36).slice(2)}`])
      .set("Content-Type", "application/json")
      .send({ email: "testuser@test.com" });
    expect(response.status).toBe(404);
  });

  it("should return 404 for DELETE request", async () => {
    const response = await request(app)
      .delete("/api/user/1")
      .set("Cookie", [`connect.sid=${Math.random().toString(36).slice(2)}`])
      .set("Content-Type", "application/json");
    expect(response.status).toBe(404);
  });
});
