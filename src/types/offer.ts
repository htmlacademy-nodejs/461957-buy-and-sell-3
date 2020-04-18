import {OfferComment} from "./offer-comment";

export interface NewOffer {
  id?: string;
  category: string[];
  description: string;
  picture: string;
  title: string;
  type: string;
  sum: number;
  comments: OfferComment[];
}

export interface Offer extends NewOffer {
  id: string;
}
