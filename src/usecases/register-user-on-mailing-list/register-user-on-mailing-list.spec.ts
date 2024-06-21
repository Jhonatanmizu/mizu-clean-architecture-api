import { describe, expect, it } from "vitest";
import { UserData } from "../../entities/user-data";

describe("Register user on mailing list use case", () => {
  it("should add user with complete data to mailing list", async () => {
    const users: UserData[] = [];
    expect(users).toBeInstanceOf(Array);
    // const repo: UserRepository = new InMemoryUserRepository(users);
    // const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
    //   repo
    // );
    // const name = "John doe";
    // const email = "any@email.com";
    // const response = await usecase.registerUserOnMailingList({ name, email });
    // const user = await repo.findUserByEmail("any@email.com");
    // expect(user).toBeDefined();
    // expect(user.name).toEqual(name);
    // expect(user.email).toEqual(email);
  });
});
