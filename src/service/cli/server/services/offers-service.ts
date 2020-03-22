import MockDataProviderService from "./mock-data-provider-service";
import {Offer} from "../../../../types/offer";

export default class OffersService {
  private _dataProviderService: MockDataProviderService;

  constructor() {
    this._dataProviderService = new MockDataProviderService();
  }

  public async getOffers(): Promise<Offer[]> {
    return this._dataProviderService.getOffers();
  }

  public async getOfferById(id: string): Promise<Offer | false> {
    return this._dataProviderService.getOfferById(id);
  }
}
