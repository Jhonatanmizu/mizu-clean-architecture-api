import { describe, expect, it } from "vitest";
import { left } from "../shared/either";
import { InvalidEmailError } from "./errors/invalid-email-error";
import { User } from "./user";
import { InvalidNameError } from "./errors/invalid-name-error";

describe("User domain entity", () => {
  it("should not create user with invalid e-mail address", () => {
    const invalidEmail = "invalid_email";
    const error = User.create({
      name: "invalid",
      email: invalidEmail,
    }).value as Error;
    expect(error.name).toEqual("InvalidEmailError");
    expect(error.message).toEqual(`Invalid email: ${invalidEmail}`);
  });

  it("should not create user with invalid name (too few characters) ", () => {
    const invalidName = "O";

    const error = User.create({
      name: invalidName,
      email: "valid@gmail.com",
    }).value as Error;
    expect(error.name).toEqual("InvalidNameError");
    expect(error.message).toEqual(`Invalid name: ${invalidName}`);
  });

  it("should not create user with invalid name (too many characters", () => {
    const invalidName = "O".repeat(257);

    const error = User.create({
      name: invalidName,
      email: "valid@gmail.com",
    }).value as Error;

    expect(error.name).toEqual("InvalidNameError");
    expect(error.message).toEqual(`Invalid name: ${invalidName}`);
  });

  it("should create user with valid name and email", () => {
    const validName = "John Doe";
    const validEmail = "any@mail.com";

    const user: User = User.create({
      name: validName,
      email: validEmail,
    }).value as User;
    expect(user.name.value).toEqual(validName);
    expect(user.email.value).toEqual(validEmail);
  });
});
