import request from "supertest";
import {app} from "../index";
import {NewOffer, OfferType} from "../../../../types/offer";
import {OfferComment} from "../../../../types/offer-comment";

const invalidOfferId = `invalid-id`;
const validCommentId = `comment-1`;
const invalidCommentId = `invalid-comment-id`;
const validNewOffer: NewOffer = {
  category: [`testCategory`],
  comments: [
    {
      text: `Comment1`,
      id: validCommentId,
    },
    {
      text: `Comment2`,
      id: `comment-2`,
    },
    {
      text: `Comment3`,
      id: `comment-3`,
    },
  ],
  description: `description`,
  picture: `picture`,
  sum: 1,
  title: `title`,
  type: OfferType.SELL,
};
const validComment: Partial<OfferComment> = {
  text: `newValidComment`,
};
const inValidComment: Partial<OfferComment> = {
  text: ``,
};
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
  let validOfferId;
  beforeEach(async () => {
    validOfferId = await addNewOffer();
  });
  afterEach(async () => {
    await deleteOffer(validOfferId);
  });

  test(`When get offers list status code should be 200`, async () => {
    const res = await request(app).get(`/api/offers/`);
    expect(res.status).toBe(200);
  });

  test(`Should return array when request offers`, async () => {
    const res = await request(app).get(`/api/offers/`);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test(`Should return code 200 when request offer`, async () => {
    const res = await request(app).get(`/api/offers/${validOfferId}`);
    expect(res.status).toBe(200);
  });

  test(`Should return code 404 when request offer with invalid id`, async () => {
    const res = await request(app).get(`/api/offers/${invalidOfferId}`);
    expect(res.status).toBe(404);
  });

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

  test(`Should return code 200 when send valid offer`, async () => {
    const res = await request(app).post(`/api/offers/`).send(validNewOffer);
    expect(res.status).toBe(200);
  });

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

  test(`Should return code 200 when update offer`, async () => {
    const res = await request(app)
      .put(`/api/offers/`)
      .send({...validNewOffer, id: validOfferId});
    expect(res.status).toBe(200);
  });

  test(`Should return code 200 when delete offer`, async () => {
    const res = await request(app).delete(`/api/offers/${validOfferId}`);
    expect(res.status).toBe(200);
  });

  test(`Should return code 404 when delete nonexistent offer`, async () => {
    const res = await request(app).delete(`/api/offers/${invalidOfferId}`);
    expect(res.status).toBe(404);
  });

  describe(`Comments`, () => {
    test(`Should return code 200 when request comments`, async () => {
      const res = await request(app).get(`/api/offers/${validOfferId}/comments`);
      expect(res.status).toBe(200);
    });

    test(`Should return code 404 when delete comment with invalid id`, async () => {
      const res = await request(app).delete(`/api/offers/${validOfferId}/comments/${invalidCommentId}`);
      expect(res.status).toBe(404);
    });

    test(`Should return code 200 when delete comment`, async () => {
      const res = await request(app).delete(`/api/offers/${validOfferId}/comments/${validCommentId}`);
      expect(res.status).toBe(200);
    });

    test(`Should return code 400 when send invalid comment`, async () => {
      const res = await request(app).post(`/api/offers/${validOfferId}/comments`).send(inValidComment);
      expect(res.status).toBe(400);
    });

    test(`Should return code 200 when send valid comment`, async () => {
      const res = await request(app).post(`/api/offers/${validOfferId}/comments`).send(validComment);
      expect(res.status).toBe(200);
    });

    test(`Should return comment with id when send valid comment`, async () => {
      const res = await request(app).post(`/api/offers/${validOfferId}/comments`).send(validComment);
      expect(res.body.hasOwnProperty(`id`)).toBe(true);
    });

    test(`Should return validation error when send invalid comment`, async () => {
      const res = await request(app).post(`/api/offers/${validOfferId}/comments`).send(inValidComment);
      const validationKeys = Object.keys(res.body) as string[];
      expect(validationKeys).toContain(`text`);
    });
  });
});

async function addNewOffer(): Promise<string> {
  const res = await request(app).post(`/api/offers/`).send(validNewOffer);
  return res.body.id;
}

async function deleteOffer(id: string): Promise<void> {
  await request(app).delete(`/api/offers/${id}`);
}
