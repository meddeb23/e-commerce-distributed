import { User, Roles } from "../entities";

export default class UserRepository {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: number): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);
    return user || null;
  }

  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const userExists = await this.findByEmail(email);
    if (userExists) {
      throw new Error("User with this email already exists");
    }
    const hashedPassword = await User.hashPassword(password);
    const id = this.users.length + 1;

    const user = new User(
      id,
      name,
      email,
      "",
      "",
      hashedPassword,
      "",
      Roles.User
    );

    this.users.push(user);
    return user;
  }

  async updateUser(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index === -1) {
      throw new Error("User not found");
    }
    const updatedAt = new Date();
    this.users[index].updatedAt = updatedAt;
  }

  async deleteUser(id: number): Promise<void> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new Error("User not found");
    }
    this.users.splice(index, 1);
  }
}
