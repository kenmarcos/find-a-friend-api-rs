import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { makeOrg } from "@/tests/factories/make-org.factory";
import { makePet } from "@/tests/factories/make-pet.factory";

describe("Get Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get a pet", async () => {
    const org = makeOrg();

    await request(app.server).post("/api/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/api/orgs/authenticate")
      .send({
        email: org.email,
        password: org.password,
      });

    const createPetResponse = await request(app.server)
      .post("/api/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet());

    const response = await request(app.server).get(
      `/api/orgs/pets/${createPetResponse.body.pet.id}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.pet.id).toBe(createPetResponse.body.pet.id);
  });
});
