import { UserRepository } from "../ports/user-repository";
import { UserData } from "../user-data";

export class InMemoryUserRepository implements UserRepository {
  private repository: UserData[];
  constructor(repository: UserData[]) {
    this.repository = repository;
  }

  add(user: UserData): Promise<void> {
    return new Promise((resolve, reject) => reject());
  }
  exists(user: UserData): Promise<boolean> {
    return new Promise((resolve, reject) => resolve(true));
  }

  findAllUsers(): Promise<UserData[]> {
    return new Promise((resolve, reject) => resolve([]));
  }
  findUserByEmail(email: string): Promise<UserData | null> {
    return new Promise((resolve, reject) => resolve(null));
  }
}
