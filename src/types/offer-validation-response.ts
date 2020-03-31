import {Offer} from "./offer";

export enum ValidationError {
  REQUIRED = `required`,
  INVALID = `invalid`,
}

export type OfferKey = keyof Offer;

export type OfferValidationResponse = {
  [key in OfferKey]?: ValidationError;
};
