import { Either, left, right } from "../shared/either";
import { Email } from "./email";
import { InvalidEmailError } from "./errors/invalid-email-error";
import { UserData } from "./user-data";

export class User {
  static create(data: UserData): Either<InvalidEmailError, User> {
    const emailOrError = Email.create(data.email);
    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError());
    }
    // return right(new User(data.name, emailOrError.value));
  }
}
