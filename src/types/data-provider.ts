import {Offer} from "./offer";

export interface DataProvider {
  getOffers(): Promise<Offer[]>;
}
