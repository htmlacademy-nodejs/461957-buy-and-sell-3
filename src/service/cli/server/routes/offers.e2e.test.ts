import request from "supertest";
import {app} from "../index";

// const runServer = require(`../index`);

test(`When get offers list status code should be 200`, async () => {
  const res = await request(app).get(`/api/offers`);
  expect(res.status).toBe(200);
});
