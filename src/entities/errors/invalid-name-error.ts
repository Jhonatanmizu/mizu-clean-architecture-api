export class InvalidNameError extends Error {
  constructor() {
    super("Name should be valid");
  }
}
