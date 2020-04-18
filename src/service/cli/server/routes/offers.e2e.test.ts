import request from "supertest";
import {app} from "../index";
import {NewOffer, OfferType} from "../../../../types/offer";

const validNewOffer: NewOffer = {
  category: [`testCategory`],
  comments: [],
  description: `description`,
  picture: `picture`,
  sum: 1,
  title: `title`,
  type: OfferType.SELL,
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

test(`When get offers list status code should be 200`, async () => {
  const res = await request(app).get(`/api/offers/`);
  expect(res.status).toBe(200);
});

test(`Should return array when request offers`, async () => {
  const res = await request(app).get(`/api/offers/`);
  expect(Array.isArray(res.body)).toBe(true);
});

test(`Should return code 200 when request offer with test id 'test-id-for-object-00-00-00-00-1d-id'`, async () => {
  const res = await request(app).get(`/api/offers/test-id-for-object-00-00-00-00-1d-id`);
  expect(res.status).toBe(200);
});

test(`Should return code 404 when request offer with invalid id 'invalid-id'`, async () => {
  const res = await request(app).get(`/api/offers/invalid-id`);
  expect(res.status).toBe(404);
});

test(`Should return offer with defined fields`, async () => {
  const res = await request(app).get(`/api/offers/test-id-for-object-00-00-00-00-1d-id`);
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
    .send({...validNewOffer, id: `test-id-for-object-00-00-00-00-1d-id`});
  expect(res.status).toBe(200);
});
