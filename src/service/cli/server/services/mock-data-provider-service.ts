import {DataProvider} from "../../../../types/data-provider";
import {Offer} from "../../../../types/offer";
import {promises as fs} from "fs";
import {config} from "../config";

export default class MockDataProviderService implements DataProvider {
  async getOffers(): Promise<Offer[]> {
    try {
      const rawOffers = await fs.readFile(config.MOCK_FILE_PATH, `utf8`);
      return JSON.parse(rawOffers) as Offer[];
    } catch (e) {
      return [];
    }
  }
}
