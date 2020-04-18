import request from "supertest";
import {app} from "../index";
import {NewOffer} from "../../../../types/offer";

const validNewOffer: NewOffer = {
  category: [`testCategory`],
  comments: [],
  description: `description`,
  picture: `picture`,
  sum: 1,
  title: `title`,
  type: `type`,
};

test(`When get offers list status code should be 200`, async () => {
  const res = await request(app).get(`/api/offers`);
  expect(res.status).toBe(200);
});

test(`Should return array when request offers`, async () => {
  const res = await request(app).get(`/api/offers`);
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

test(`Should return offer with id when request to add offer`, async () => {
  const res = await request(app).post(`/api/offers`).send(validNewOffer);
  expect(res.body.hasOwnProperty(`id`)).toBe(true);
});
