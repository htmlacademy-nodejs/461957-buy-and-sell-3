import {ValidationError} from "./offer-validation-response";
import {OfferComment} from "./offer-comment";

export type CommentKey = keyof OfferComment;

export type CommentValidationResponse = {
  [key in CommentKey]?: ValidationError;
};
