import {ValidationError} from "./validation-error";

export class PropertyRequiredError extends ValidationError {
  public property: string;
  constructor(property: string) {
    super(`Field '${property}' required`);
    this.name = `PropertyRequiredError`;
    this.property = property;
  }
}
