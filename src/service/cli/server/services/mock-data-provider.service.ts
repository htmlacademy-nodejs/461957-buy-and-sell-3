import {DataProvider} from "../../../../types/data-provider";
import {Offer} from "../../../../types/offer";
import {promises as fs} from "fs";
import {config} from "../config";
import nanoid from "nanoid";

export default class MockDataProviderService implements DataProvider {
  private sessionOffers: Offer[] = [];

  async getOffers(): Promise<Offer[]> {
    try {
      const rawOffers = await fs.readFile(config.MOCK_FILE_PATH, `utf8`);
      return [...(JSON.parse(rawOffers) as Offer[]), ...this.sessionOffers];
    } catch (e) {
      return [];
    }
  }

  async getOfferById(id: string): Promise<Offer | null> {
    try {
      const rawOffers = await fs.readFile(config.MOCK_FILE_PATH, `utf8`);
      return (JSON.parse(rawOffers) as Offer[]).find((offer) => offer.id === id) ?? null;
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
    return Object.assign(await this.getOfferById(offer.id), offer);
  }
}
