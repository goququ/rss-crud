import { Store, User } from "../store";
import { RequestHandler } from "../utils/message";
import { validate, validateIncomingUser } from "../utils/validation";
import { v4 as uuid } from "uuid";

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

    this.store.addUser(newUser);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
  }
}
