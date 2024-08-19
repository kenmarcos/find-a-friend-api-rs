import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { makeOrg } from "@/tests/factories/make-org.factory";
import { makePet } from "@/tests/factories/make-pet.factory";

describe("Create Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new pet", async () => {
    const org = makeOrg();

    await request(app.server).post("/api/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/api/orgs/authenticate")
      .send({
        email: org.email,
        password: org.password,
      });

    const response = await request(app.server)
      .post("/api/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet());

    expect(response.statusCode).toBe(201);
  });
});
