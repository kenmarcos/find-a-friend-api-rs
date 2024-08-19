import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { makeOrg } from "@/tests/factories/make-org.factory";

describe("Authenticate Org (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate an org", async () => {
    const org = makeOrg();

    await request(app.server).post("/api/orgs").send(org);

    const response = await request(app.server)
      .post("/api/orgs/authenticate")
      .send({
        email: org.email,
        password: org.password,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toEqual(expect.any(String));
  });
});
