import {Offer} from "./offer";

export enum ValidationError {
  REQUIRED = `required`,
  INVALID = `invalid`,
}

export type OfferValidationResponse = {
  [key in keyof Offer]?: ValidationError;
};
