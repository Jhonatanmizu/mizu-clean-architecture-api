import { Either, left, right } from "../shared/either";
import { InvalidEmailError } from "./errors/invalid-email-error";

export class Email {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }
  static validate(email: string): boolean {
    const emailRegex =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}]~(\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!email) return false;
    const [local, domain] = email.split("@");

    if (!emailRegex.test(email)) return false;

    if (local.length > 64 || local.length === 0) {
      return false;
    }

    if (domain.length > 255 || domain.length === 0) {
      return false;
    }
    if (email.length > 320) {
      return false;
    }

    const domainParts = domain.split(".");
    const isDomainSomePartInvalid = domainParts.some((dp) => dp.length > 63);
    if (isDomainSomePartInvalid) return false;
    return true;
  }

  static create(email: string): Either<InvalidEmailError, Email> {
    const isValid = this.validate(email);
    if (isValid) {
      return right(new Email(email));
    }

    return left(new InvalidEmailError());
  }
}
