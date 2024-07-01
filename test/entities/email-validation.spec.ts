import { describe, expect, it } from "vitest";
import { Email } from "../../src/entities/email";

describe("Email Validation", () => {
  it("should not accept empty strings", () => {
    const email = "";
    const result = Email.validate(email);
    expect(result).toBeFalsy();
  });

  it("should not accept local part with invalid char", () => {
    const email = "any @gmail.com";
    const result = Email.validate(email);
    expect(result).toBeFalsy();
  });

  it("should not accept domain part with invalid char", () => {
    const email = "any@ gmail.com";
    const result = Email.validate(email);
    expect(result).toBeFalsy();
  });

  it("should not accept local part larger than 64 chars", () => {
    const email = "l".repeat(65) + "gmail.com";
    const result = Email.validate(email);
    expect(result).toBeFalsy();
  });

  it("should not accept strings larger than 320 chars", () => {
    const email =
      "l".repeat(64) + "@" + "d".repeat(128) + "." + "d".repeat(127);
    const result = Email.validate(email);
    expect(result).toBeFalsy();
  });

  it("should not accept domain part larger than 255 chars", () => {
    const email = "local@" + "d".repeat(128) + "." + "d".repeat(127);
    const result = Email.validate(email);
    expect(result).toBeFalsy();
  });

  it("should not accept empty local part", () => {
    const email = "@gmail.com";
    const result = Email.validate(email);
    expect(result).toBeFalsy();
  });
  it("should not accept empty domain part", () => {
    const email = "local@";
    const result = Email.validate(email);
    expect(result).toBeFalsy();
  });

  it("should not accept domain with a part larger than 63 chars", () => {
    const email = "local@" + "d".repeat(64) + ".com";
    const result = Email.validate(email);
    expect(result).toBeFalsy();
  });
});
