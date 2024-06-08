import { describe, expect, it } from "vitest";
import { UserData } from "../user-data";
import { InMemoryUserRepository } from "./in-memory-user-repository";

describe("In Memory User Repository", () => {
  it("should return null if user is not found", async () => {
    const users: UserData[] = [];
    const userRepo = new InMemoryUserRepository(users);
    const user = await userRepo.findUserByEmail("example@mail.com");
    expect(user).toBe(null);
  });

  it("should return user if it is found", async () => {
    const users: UserData[] = [];
    const userRepo = new InMemoryUserRepository(users);
    const userData: UserData = { name: "john doe", email: "johndoe@gmail" };
    await userRepo.add(userData);
    const user = await userRepo.findUserByEmail(userData.email);
    expect(user).toBeDefined();
    expect(userData.name).toEqual(user?.name);
    expect(userData.email).toEqual(user?.email);
  });

  it("should return a empty array when does not have users", async () => {
    const users: UserData[] = [];
    const userRepo = new InMemoryUserRepository(users);
    const result = await userRepo.findAllUsers();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(0);
  });

  it("should return a users array", async () => {
    const users: UserData[] = [];
    const userRepo = new InMemoryUserRepository(users);
    const result = await userRepo.findAllUsers();
    const userData: UserData = { name: "john doe", email: "johndoe@gmail" };
    await userRepo.add(userData);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(1);
  });
});
