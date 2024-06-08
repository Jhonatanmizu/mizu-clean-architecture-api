import { UserRepository } from "../ports/user-repository";
import { UserData } from "../user-data";

export class InMemoryUserRepository implements UserRepository {
  private repository: UserData[];
  constructor(repository: UserData[]) {
    this.repository = repository;
  }

  async add(user: UserData): Promise<void> {
    const exists = await this.exists(user);
    if (!exists) this.repository.push(user);
  }
  async exists(user: UserData): Promise<boolean> {
    const result = await this.findUserByEmail(user.email);
    return !!result;
  }

  async findAllUsers(): Promise<UserData[]> {
    return this.repository;
  }
  async findUserByEmail(email: string): Promise<UserData | null> {
    const users = await this.findAllUsers();
    const user = users.find((u) => u.email === email);
    return user || null;
  }
}
