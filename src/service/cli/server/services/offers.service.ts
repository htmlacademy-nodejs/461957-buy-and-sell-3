import MockDataProviderService from "./mock-data-provider.service";
import {Offer} from "../../../../types/offer";
import {OfferComment} from "../../../../types/offer-comment";

export default class OffersService {
  private _dataProviderService: MockDataProviderService;

  constructor() {
    this._dataProviderService = new MockDataProviderService();
  }

  public async getOffers(): Promise<Offer[]> {
    return this._dataProviderService.getOffers();
  }

  public async getOfferById(id: string): Promise<Offer | null> {
    return this._dataProviderService.getOfferById(id);
  }

  public async getCategories(): Promise<string[] | false> {
    return this._dataProviderService.getCategories();
  }

  public async addOffer(offer: Offer): Promise<Offer> {
    return this._dataProviderService.addOffer(offer);
  }

  public async updateOffer(offer: Offer): Promise<Offer> {
    return this._dataProviderService.updateOffer(offer);
  }

  public async deleteOfferById(id: string): Promise<void> {
    return this._dataProviderService.deleteOfferById(id);
  }

  public async getOfferComments(id: string): Promise<OfferComment[]> {
    return this._dataProviderService.getOfferComments(id);
  }
}
