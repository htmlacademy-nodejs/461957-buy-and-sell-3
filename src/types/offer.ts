import {OfferComment} from "./offer-comment";

export enum OfferType {
  BUY = `buy`,
  SELL = `sell`,
}

export interface NewOffer {
  id?: string;
  category: string[];
  description: string;
  picture: string;
  title: string;
  type: OfferType;
  sum: number;
  comments: OfferComment[];
}

export interface Offer extends NewOffer {
  id: string;
}
