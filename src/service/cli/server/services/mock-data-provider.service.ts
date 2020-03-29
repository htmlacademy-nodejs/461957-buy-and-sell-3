import {DataProvider} from "../../../../types/data-provider";
import {Offer} from "../../../../types/offer";
import {promises as fs} from "fs";
import {config} from "../config";
import nanoid from "nanoid";
import {NotFoundError} from "../errors/not-found-error";
import {OfferComment} from "../../../../types/offer-comment";

export default class MockDataProviderService implements DataProvider {
  private sessionOffers: Offer[] = [];
  private deletedOffersId: string[] = [];

  async getOffers(): Promise<Offer[]> {
    try {
      if (this.sessionOffers.length === 0) {
        const rawOffers = await fs.readFile(config.MOCK_FILE_PATH, `utf8`);
        this.sessionOffers = JSON.parse(rawOffers) as Offer[];
      }
      return this.sessionOffers.filter((offer) => !this.deletedOffersId.includes(offer.id));
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
      throw new NotFoundError(`Offer by id [${offer.id}] did not found`);
    }
    return Object.assign(await this.getOfferById(offer.id), offer);
  }

  async deleteOfferById(id: string): Promise<void> {
    try {
      if (await this.getOfferById(id)) {
        this.deletedOffersId.push(id);
        return Promise.resolve();
      }
      throw new NotFoundError(`Offer by id [${id}] did not found`);
    } catch (e) {
      throw e;
    }
  }

  async getOfferComments(id: string): Promise<OfferComment[]> {
    try {
      return (await this.getOfferById(id)).comments ?? [];
    } catch (e) {
      throw e;
    }
  }

  async deleteCommentById(offerId: string, commentId: string): Promise<void> {
    const offer = await this.getOfferById(offerId);
    if (!offer) {
      throw new NotFoundError(`Offer by id [${offerId}] did not found`);
    }
    const commentIndex = offer.comments.findIndex((comment) => comment.id === commentId);
    if (commentIndex === -1) {
      throw new NotFoundError(`Comment by id [${commentId}] did not found`);
    }
    offer.comments.splice(commentIndex, 1);
    return;
  }

  async createComment(offerId: string, comment: OfferComment): Promise<Offer> {
    const offer = await this.getOfferById(offerId);
    const newComment = {...comment, id: nanoid()};
    offer.comments.push(newComment);
    return offer;
  }

  async searchByOfferTitle(query: string): Promise<Offer[]> {
    return (await this.getOffers()).filter((offer) => offer.title.includes(query));
  }
}
