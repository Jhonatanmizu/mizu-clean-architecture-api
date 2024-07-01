import { describe, expect, it } from "vitest";
import { UserData } from "../../../src/entities/user-data";
import { UserRepository } from "../../../src/usecases/register-user-on-mailing-list/ports/user-repository";
import { RegisterUserOnMailingList } from "../../../src/usecases/register-user-on-mailing-list/register-user-on-mailing-list";
import { InMemoryUserRepository } from "./repository/in-memory-user-repository";

describe("Register user on mailing list use case", () => {
  it("should add user with complete data to mailing list", async () => {
    const users: UserData[] = [];
    expect(users).toBeInstanceOf(Array);
    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    );
    const name = "John doe";
    const email = "any@email.com";
    const response = await usecase.registerUserOnMailingList({ name, email });
    const user = await repo.findUserByEmail(email);
    expect(user?.name).toEqual(name);
    expect(response.value.name).toEqual(name);
  });

  it("should not add user with invalid e-mail to mailing list", async () => {
    const users: UserData[] = [];
    expect(users).toBeInstanceOf(Array);
    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    );
    const name = "John doe";
    const invalidEmail = "anyemail.com";
    const response = await usecase.registerUserOnMailingList({
      name,
      email: invalidEmail,
    });
    const responseError = response.value as Error;
    const user = await repo.findUserByEmail(invalidEmail);
    expect(user).toBeNull();
    expect(responseError.message).toEqual(`Invalid email: ${invalidEmail}`);
  });

  it("should not add user with invalid name to mailing list", async () => {
    const users: UserData[] = [];
    expect(users).toBeInstanceOf(Array);
    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    );
    const invalidName = "Jo";
    const email = "any@email.com";
    const response = await usecase.registerUserOnMailingList({
      name: invalidName,
      email,
    });
    const responseError = response.value as Error;
    const user = await repo.findUserByEmail(email);
    expect(user).toBeNull();
    expect(responseError.message).toEqual(`Invalid name: ${invalidName}`);
  });
});
