import { Either, left, right } from "../shared/either";
import { InvalidNameError } from "./errors/invalid-name-error";

export class Name {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(name: string): Either<InvalidNameError, Name> {
    const isValid = this.validate(name);

    if (!isValid) {
      return left(new InvalidNameError());
    }

    return right(new Name(name));
  }

  static validate(name: string): boolean {
    if (!name) return false;

    if (name.trim().length <= 2) return false;

    if (name.trim().length > 256) return false;

    return true;
  }
}
