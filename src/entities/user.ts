import { Either, left, right } from "../shared/either";
import { Email } from "./email";
import { InvalidEmailError } from "./errors/invalid-email-error";
import { InvalidNameError } from "./errors/invalid-name-error";
import { Name } from "./name";
import { UserData } from "./user-data";

export class User {
  public readonly email: Email;
  public readonly name: Name;

  private constructor(name: Name, email: Email) {
    this.name = name;
    this.email = email;
  }

  static create(
    data: UserData
  ): Either<InvalidEmailError | InvalidNameError, User> {
    const nameOrError = Name.create(data.name);

    if (nameOrError.isLeft()) {
      return left(new InvalidNameError(data.name));
    }

    const emailOrError = Email.create(data.email);
    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError(data.email));
    }
    const name = nameOrError.value as Name;
    const email = emailOrError.value as Email;
    return right(new User(name, email));
  }
}
