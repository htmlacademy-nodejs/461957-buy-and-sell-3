import MockDataProviderService from "./mock-data-provider.service";
import {Offer} from "../../../../types/offer";
import {ValidationError} from "../errors/validation-error";
import {PropertyRequiredError} from "../errors/property-required-error";

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
    if (isOfferValid(offer)) {
      return this._dataProviderService.addOffer(offer);
    }
    throw getOfferValidationError(offer);
  }
}

function isOfferValid(offer: Offer): boolean | ValidationError {
  return offer.picture && offer.title && offer.type && offer.description && offer.category.length && offer.sum && offer.sum > 0;
}

function getOfferValidationError(offer: Offer): ValidationError {
  if (!offer.picture) {
    throw new PropertyRequiredError(`picture`);
  }
  if (!offer.title) {
    throw new PropertyRequiredError(`title`);
  }
  if (!offer.type) {
    throw new PropertyRequiredError(`type`);
  }
  if (!offer.description) {
    throw new PropertyRequiredError(`description`);
  }
  if (!offer.category.length) {
    throw new PropertyRequiredError(`category`);
  }
  if (!offer.sum) {
    throw new PropertyRequiredError(`sum`);
  }
  return new ValidationError(`Invalid offer`);
}
