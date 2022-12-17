export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export class Store {
  private users: User[] = [];

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }

  async addUser(user: User) {
    this.users.push(user);
  }

  async deleteUser(id: string) {
    this.users.filter((u) => u.id === id);
  }
}
