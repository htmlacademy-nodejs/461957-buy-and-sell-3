import MockDataProviderService from "./mock-data-provider.service";
import { Offer } from "../../../../types/offer";

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

  public async getCategories(): Promise<string[] | false> {
    return this._dataProviderService.getCategories();
  }

  public async addOffer(offer: Offer): Promise<string | false> {
    if (this.isOfferValid(offer)) {
      return this._dataProviderService.addOffer(offer)
    }
    return false
  }

  private isOfferValid(offer: Offer): boolean {
    return offer.picture && offer.title && offer.type && offer.description && offer.category.length && offer.sum && (offer.sum > 0);
  }
}
