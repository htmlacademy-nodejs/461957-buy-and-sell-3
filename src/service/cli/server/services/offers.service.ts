import MockDataProviderService from "./mock-data-provider.service";
import {Offer} from "../../../../types/offer";
import {OfferComment} from "../../../../types/offer-comment";
import {DataProvider} from "../../../../types/data-provider";

class OffersService {
  private _dataProviderService: DataProvider;

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

  public async deleteCommentById(offerId: string, commentId: string): Promise<void> {
    return this._dataProviderService.deleteCommentById(offerId, commentId);
  }

  public async createComment(offerId: string, comment: OfferComment): Promise<Offer> {
    return this._dataProviderService.createComment(offerId, comment);
  }

  public async searchByOfferTitle(query: string): Promise<Offer[]> {
    return this._dataProviderService.searchByOfferTitle(query);
  }
}

const offersService = new OffersService();

export default offersService;
