import {OfferComment} from "./offer-comment";

export interface Offer {
  id: string;
  category: string[],
  description: string,
  picture: string,
  title: string,
  type: string,
  sum: number,
  comments: OfferComment[];
}
