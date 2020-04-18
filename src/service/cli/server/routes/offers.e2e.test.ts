import request from "supertest";
import {app} from "../index";
import {NewOffer, OfferType} from "../../../../types/offer";
import {OfferComment} from "../../../../types/offer-comment";

const validOfferId = `test-id-for-object-00-00-00-00-1d-id`;
const invalidOfferId = `invalid-id`;
const offerWithCommentsId = `test-id-for-offers-with-comments`;
const validNewOffer: NewOffer = {
  category: [`testCategory`],
  comments: [],
  description: `description`,
  picture: `picture`,
  sum: 1,
  title: `title`,
  type: OfferType.SELL,
};
const comments: OfferComment[] = [
  {
    text: `Comment1`,
    id: `comment-1`,
  },
  {
    text: `Comment2`,
    id: `comment-2`,
  },
  {
    text: `Comment3`,
    id: `comment-3`,
  },
];

const invalidNewOffer = {
  category: [],
  comments: ``,
  description: ``,
  picture: ``,
  sum: 0,
  title: ``,
  type: ``,
};

describe(`Offers API end-points`, () => {
  test(`When get offers list status code should be 200`, async () => {
    const res = await request(app).get(`/api/offers/`);
    expect(res.status).toBe(200);
  });

  test(`Should return array when request offers`, async () => {
    const res = await request(app).get(`/api/offers/`);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // TODO: add new offer
  test(`Should return code 200 when request offer with test id ${validOfferId}`, async () => {
    const res = await request(app).get(`/api/offers/${validOfferId}`);
    expect(res.status).toBe(200);
  });

  test(`Should return code 404 when request offer with invalid id '${invalidOfferId}'`, async () => {
    const res = await request(app).get(`/api/offers/${invalidOfferId}`);
    expect(res.status).toBe(404);
  });

  // TODO: add new offer
  test(`Should return offer with defined fields`, async () => {
    const res = await request(app).get(`/api/offers/${validOfferId}`);
    const responseKeys = Object.keys(res.body) as string[];
    expect(responseKeys).toContain(`id`);
    expect(responseKeys).toContain(`category`);
    expect(responseKeys).toContain(`description`);
    expect(responseKeys).toContain(`picture`);
    expect(responseKeys).toContain(`title`);
    expect(responseKeys).toContain(`type`);
    expect(responseKeys).toContain(`sum`);
    expect(responseKeys).toContain(`comments`);
  });

  // TODO: add new offer
  test(`Should return code 200 when send valid offer`, async () => {
    const res = await request(app).post(`/api/offers/`).send(validNewOffer);
    expect(res.status).toBe(200);
  });

  // TODO: add new offer
  test(`Should return offer with id when request to add offer`, async () => {
    const res = await request(app).post(`/api/offers/`).send(validNewOffer);
    expect(res.body.hasOwnProperty(`id`)).toBe(true);
  });

  test(`Should return code 400 when send invalid offer`, async () => {
    const res = await request(app).post(`/api/offers/`).send(invalidNewOffer);
    expect(res.status).toBe(400);
  });

  test(`Should return validation error when send invalid offer`, async () => {
    const res = await request(app).post(`/api/offers/`).send(invalidNewOffer);
    const validationKeys = Object.keys(res.body) as string[];
    expect(validationKeys).toContain(`picture`);
    expect(validationKeys).toContain(`sum`);
    expect(validationKeys).toContain(`category`);
    expect(validationKeys).toContain(`description`);
    expect(validationKeys).toContain(`title`);
    expect(validationKeys).toContain(`type`);
  });

  // TODO: add new offer
  test(`Should return code 200 when update offer`, async () => {
    const res = await request(app)
      .put(`/api/offers/`)
      .send({...validNewOffer, id: validOfferId});
    expect(res.status).toBe(200);
  });

  // TODO: add new offer
  test(`Should return code 200 when delete offer`, async () => {
    const res = await request(app).delete(`/api/offers/${validOfferId}`);
    expect(res.status).toBe(200);
  });

  test(`Should return code 404 when delete nonexistent offer`, async () => {
    const res = await request(app).delete(`/api/offers/${invalidOfferId}`);
    expect(res.status).toBe(404);
  });

  describe(`Offer comments`, () => {
    let newOfferId;
    beforeAll(async () => {
      newOfferId = await addOfferWithComments();
    });

    test(`Should return code 200 when request comments`, async () => {
      console.log(newOfferId);
      const res = await request(app).get(`/api/offers/${newOfferId}/comments`);
      expect(res.status).toBe(200);
    });
  });
});

async function addOfferWithComments() {
  const res = await request(app)
    .post(`/api/offers/`)
    .send({...validNewOffer, comments});

  return res.body.id;
}
