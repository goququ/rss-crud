import { isNil } from "./utils/common";

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export class Store {
  private users: Record<string, User> = {};

  async getAllUsers(): Promise<User[]> {
    return Object.values(this.users);
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.users[id];
  }

  async addUser(user: User) {
    if (user.id in this.users) {
      throw new Error("User already exists");
    }

    this.users[user.id] = user;
  }

  async updateUser(userId: string, user: Partial<Omit<User, "id">>) {
    if (!(userId in this.users)) {
      throw new Error(`No such user with id: ${userId}`);
    }

    const oldUser = await this.getUserById(userId);
    const updatedUser = Object.assign({}, oldUser, {
      ...(!isNil(user.hobbies) && { hobbies: user.hobbies }),
      ...(!isNil(user.age) && { age: user.age }),
      ...(!isNil(user.username) && { username: user.username }),
    });

    this.users[userId] = updatedUser;

    return updatedUser;
  }

  async deleteUser(id: string) {
    delete this.users[id];
  }
}
