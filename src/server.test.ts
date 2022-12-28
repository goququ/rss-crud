import * as http from "http";

import * as superagent from "superagent";
import { createServer } from "./server";

const getUrl = (path: string) =>
  new URL(`api${path}`, "http://localhost:4000").toString();

const TEST_USER = {
  username: "Some test user",
  age: 123,
  hobbies: ["some hobby"],
};

describe("Application integration tests", function () {
  let server: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;

  beforeEach(async () => {
    server = await createServer({ notify: false });
  });

  afterEach(async () => {
    server.close();
  });

  it("Create user", async function () {
    await superagent.get(getUrl("/users")).then(({ body }) => {
      expect(body).toStrictEqual([]);
    });

    const createdUser = await superagent
      .post(getUrl("/users"))
      .send(TEST_USER)
      .then(({ body, status }) => {
        expect(typeof body.id === "string").toBe(true);

        const { id, ...userFromServer } = body;

        expect(status).toEqual(201);
        expect(userFromServer).toEqual(TEST_USER);

        return body;
      });

    await superagent.get(getUrl("/users")).then(({ body }) => {
      expect(body.some((user) => user.id === createdUser.id)).toBe(true);
    });
  });

  it("User creation validation works", async function () {
    const noDataRequest = await superagent
      .post(getUrl("/users"))
      .send({})
      .catch((error) => error);

    expect(noDataRequest.status).toBe(400);

    const noUsernameRequest = await superagent
      .post(getUrl("/users"))
      .send({ ...TEST_USER, username: "" })
      .catch((res) => res);

    expect(noUsernameRequest.status).toBe(400);

    const noAgeRequest = await superagent
      .post(getUrl("/users"))
      .send({ ...TEST_USER, age: "" })
      .catch((res) => res);

    expect(noAgeRequest.status).toBe(400);

    const noHobbiesRequest = await superagent
      .post(getUrl("/users"))
      .send({ ...TEST_USER, hobbies: "" })
      .catch((res) => res);

    expect(noHobbiesRequest.status).toBe(400);
  });

  it("Get user by id", async function () {
    const { body: createdUser } = await superagent
      .post(getUrl("/users"))
      .send(TEST_USER);

    const userRequest = await superagent.get(
      getUrl(`/users/${createdUser.id}`),
    );

    expect(userRequest.status).toBe(200);
    expect(userRequest.body).toStrictEqual(createdUser);

    const unknownUserRequest = await superagent
      .get(getUrl(`/users/123`))
      .catch((e) => e);

    expect(unknownUserRequest.status).toBe(404);
  });

  it("Update user by id", async function () {
    const { body: createdUser } = await superagent
      .post(getUrl("/users"))
      .send(TEST_USER);

    const NEW_VALUES = {
      username: "TEST",
      age: 321,
      hobbies: ["test"],
    };
    const userRequest = await superagent
      .put(getUrl(`/users/${createdUser.id}`))
      .send(NEW_VALUES);

    expect(userRequest.status).toBe(200);
    expect(userRequest.body).toStrictEqual({
      ...NEW_VALUES,
      id: createdUser.id,
    });

    const unknownUserRequest = await superagent
      .put(getUrl(`/users/123`))
      .send(NEW_VALUES)
      .catch((e) => e);

    expect(unknownUserRequest.status).toBe(404);
  });

  it("Delete user by id", async function () {
    const { body: createdUser } = await superagent
      .post(getUrl("/users"))
      .send(TEST_USER);

    const userDeleteRequest = await superagent.delete(
      getUrl(`/users/${createdUser.id}`),
    );

    expect(userDeleteRequest.status).toBe(204);

    const getDeletedUserRequest = await superagent
      .get(getUrl(`/users/${createdUser.id}`))
      .catch((e) => e);

    expect(getDeletedUserRequest.status).toBe(404);
  });
});
