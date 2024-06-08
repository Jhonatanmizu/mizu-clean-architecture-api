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
});
