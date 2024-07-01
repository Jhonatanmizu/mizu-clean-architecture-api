import { Either, left, right } from "../shared/either";
import { Email } from "./email";
import { InvalidEmailError } from "./errors/invalid-email-error";
import { InvalidNameError } from "./errors/invalid-name-error";
import { Name } from "./name";
import { UserData } from "./user-data";

export class User {
  static create(
    data: UserData
  ): Either<InvalidEmailError | InvalidNameError, User> {
    const emailOrError = Email.create(data.email);
    const nameOrError = Name.create(data.name);

    if (nameOrError.isLeft()) {
      return left(new InvalidNameError());
    }

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError());
    }

    return right(new User(data.name, emailOrError.value));
  }
}
