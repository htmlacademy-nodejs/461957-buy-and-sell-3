import {Offer} from "./offer";
import {OfferComment} from "./offer-comment";

export interface DataProvider {
  getOffers(): Promise<Offer[]>;
  getOfferById(is: string): Promise<Offer | null>;
  // TODO: return error
  getCategories(): Promise<string[] | false>;
  addOffer(offer: Offer): Promise<Offer>;
  updateOffer(offer: Offer): Promise<Offer>;
  deleteOfferById(id: string): Promise<void>;
  getOfferComments(id: string): Promise<OfferComment[]>;
  deleteCommentById(offerId: string, commentId: string): Promise<void>;
  createComment(offerId: string, comment: OfferComment): Promise<Offer>;
}
