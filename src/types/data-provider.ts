import {Offer} from "./offer";

export interface DataProvider {
  // TODO: return error
  getOffers(): Promise<Offer[]>;
  getOfferById(is: string): Promise<Offer | null>;
  // TODO: return error
  getCategories(): Promise<string[] | false>;
  // TODO: return error
  addOffer(offer: Offer): Promise<Offer>;
}
