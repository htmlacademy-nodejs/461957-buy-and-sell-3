import {DataProvider} from "../../../../types/data-provider";
import {Offer} from "../../../../types/offer";
import {promises as fs} from "fs";
import {config} from "../config";
import nanoid from "nanoid";
import {NotFoundError} from "../errors/not-found-error";

export default class MockDataProviderService implements DataProvider {
  private sessionOffers: Offer[] = [];
  private deletedOffersId: string[] = [];

  async getOffers(): Promise<Offer[]> {
    try {
      const rawOffers = await fs.readFile(config.MOCK_FILE_PATH, `utf8`);
      return [...(JSON.parse(rawOffers) as Offer[]), ...this.sessionOffers].filter((offer) => !this.deletedOffersId.includes(offer.id));
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async getOfferById(id: string): Promise<Offer | null> {
    try {
      return (await this.getOffers()).find((offer) => offer.id === id) ?? null;
    } catch (e) {
      throw e;
    }
  }

  async getCategories(): Promise<string[] | false> {
    try {
      const offers = await this.getOffers();
      return Array.from(new Set(offers.flatMap((offer) => offer.category)));
    } catch (e) {
      return false;
    }
  }

  async addOffer(offer: Offer): Promise<Offer> {
    const newOffer = {...offer, id: nanoid()};
    this.sessionOffers.push(newOffer);
    return Promise.resolve(newOffer);
  }

  async updateOffer(offer: Offer): Promise<Offer> {
    const currentOffer = await this.getOfferById(offer.id);
    if (currentOffer === null) {
      throw new NotFoundError(`id [${offer.id}] did not found`);
    }
    return Object.assign(await this.getOfferById(offer.id), offer);
  }

  async deleteOfferById(id: string): Promise<void> {
    try {
      if (await this.getOfferById(id)) {
        this.deletedOffersId.push(id);
        return Promise.resolve();
      }
      throw new NotFoundError(`id [${id}] did not found`);
    } catch (e) {
      throw e;
    }
  }
}
