import {Offer} from "./offer";

export interface DataProvider {
  // TODO: return error
  getOffers(): Promise<Offer[]>;
  // TODO: return error
  getOfferById(is: string): Promise<Offer | false>;
  // TODO: return error
  getCategories(): Promise<string[] | false>;
  // TODO: return error
  addOffer(offer: Offer): Promise<Offer>;
}
