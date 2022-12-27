import { Store, User } from "../store";
import { RequestHandler } from "../utils/message";
import {
  validate,
  validateIncomingUser,
  validateUserToUpdate,
} from "../utils/validation";
import { v4 as uuid } from "uuid";
import { ROUTES } from "../router/consts";
import { validatePath } from "../utils/validation";
import { getRouteParams } from "../router/utils";

export class UserHandlers {
  private store: Store;

  constructor({ store }: { store: Store }) {
    this.store = store;
  }

  getUsersHandler: RequestHandler = async (req, res) => {
    const users = await this.store.getAllUsers();
    const data = JSON.stringify(users);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  };

  // @ts-ignore
  @validate(validateIncomingUser)
  public async addUserHandler(req, res) {
    const data = req.body as Omit<User, "id">;
    const newUser = { id: uuid(), ...data };

    await this.store.addUser(newUser);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
  }

  // @ts-ignore
  @validate(validatePath(ROUTES.singleUser))
  public async getUserByIdHandler(req, res) {
    const params = getRouteParams<{ userId: string }>(
      ROUTES.singleUser,
      req?.url || "",
    );
    const userId = params?.userId;

    if (!userId) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "No user id" }));
      return;
    }

    const user = await this.store.getUserById(userId);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Unknown user" }));
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  }

  // @ts-ignore
  @validate(validateUserToUpdate)
  public async updateUserByIdHandler(req, res) {
    const params = getRouteParams<{ userId: string }>(
      ROUTES.singleUser,
      req?.url || "",
    );
    const userId = params?.userId;

    if (!userId) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "No user id" }));
      return;
    }

    const user = await this.store.getUserById(userId);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Unknown user" }));
      return;
    }

    const data = req.body as Omit<User, "id">;
    const updatedUser = await this.store.updateUser(userId, data);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedUser));
  }

  // @ts-ignore
  @validate(validatePath(ROUTES.singleUser))
  async deleteUserById(req, res) {
    const params = getRouteParams<{ userId: string }>(
      ROUTES.singleUser,
      req?.url || "",
    );
    const userId = params?.userId;

    if (!userId) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "No user id" }));
      return;
    }

    const user = await this.store.getUserById(userId);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Unknown user" }));
      return;
    }

    await this.store.deleteUser(userId);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end();
  }
}
