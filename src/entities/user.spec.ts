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
    });
    expect(error).toEqual(left(new InvalidEmailError()));
  });

  it("should not create user with invalid name (too few characters) ", () => {
    const invalidName = "O";

    const error = User.create({
      name: invalidName,
      email: "valid@gmail.com",
    });

    expect(error).toEqual(left(new InvalidNameError()));
  });

  it("should not create user with invalid name (too many characters", () => {
    const invalidName = "O".repeat(257);

    const error = User.create({
      name: invalidName,
      email: "valid@gmail.com",
    });

    expect(error).toEqual(left(new InvalidNameError()));
  });
});
