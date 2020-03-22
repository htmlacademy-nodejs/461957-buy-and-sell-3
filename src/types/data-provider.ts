import {Offer} from "./offer";

export interface DataProvider {
  getOffers(): Promise<Offer[]>;
  getOfferById(is: string): Promise<Offer | false>;
}
