import { InMemoryUserRepository } from "./repository/in-memory-user-repository";
import { describe, expect, it } from "vitest";
import { UserData } from "../../entities/user-data";
import { UserRepository } from "./ports/user-repository";
import { RegisterUserOnMailingList } from "./register-user-on-mailing-list";
import { left } from "../../shared/either";
import { InvalidEmailError } from "../../entities/errors/invalid-email-error";
import { InvalidNameError } from "../../entities/errors/invalid-name-error";

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
    const user = await repo.findUserByEmail(invalidEmail);
    expect(user).toBeNull();
    expect(response).toEqual(left(new InvalidEmailError()));
  });

  it("should not add user with invalid name to mailing list", async () => {
    const users: UserData[] = [];
    expect(users).toBeInstanceOf(Array);
    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    );
    const name = "Jo";
    const email = "any@email.com";
    const response = await usecase.registerUserOnMailingList({
      name,
      email,
    });
    const user = await repo.findUserByEmail(email);
    expect(user).toBeNull();
    expect(response).toEqual(left(new InvalidNameError()));
  });
});
