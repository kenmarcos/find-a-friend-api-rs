import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { makeOrg } from "@/tests/factories/make-org.factory";
import { makePet } from "@/tests/factories/make-pet.factory";

describe("Search Pets (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search pets by city", async () => {
    const org = makeOrg();

    await request(app.server).post("/api/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/api/orgs/authenticate")
      .send({
        email: org.email,
        password: org.password,
      });

    // Cria 2 pets
    await request(app.server)
      .post("/api/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet());

    await request(app.server)
      .post("/api/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet());

    const response = await request(app.server)
      .get("/api/orgs/pets")
      .query({ city: org.city });

    expect(response.statusCode).toBe(200);
    expect(response.body.pets).toHaveLength(2);
  });

  it("should not be able to search pets without city", async () => {
    const response = await request(app.server).get("/api/orgs/pets");

    expect(response.statusCode).toBe(400);
  });

  it("should be able to search pets by city and breed", async () => {
    const org = makeOrg();

    await request(app.server).post("/api/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/api/orgs/authenticate")
      .send({
        email: org.email,
        password: org.password,
      });

    // Cria 2 pets
    await request(app.server)
      .post("/api/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet({ breed: "Yorkshire" }));

    await request(app.server)
      .post("/api/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet());

    const response = await request(app.server)
      .get("/api/orgs/pets")
      .query({ city: org.city, breed: "Yorkshire" });

    expect(response.statusCode).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  it("should be able to search pets by city and life stage", async () => {
    const org = makeOrg();

    await request(app.server).post("/api/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/api/orgs/authenticate")
      .send({
        email: org.email,
        password: org.password,
      });

    // Cria 2 pets
    await request(app.server)
      .post("/api/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet({ life_stage: "PUPPY" }));

    await request(app.server)
      .post("/api/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet());

    const response = await request(app.server)
      .get("/api/orgs/pets")
      .query({ city: org.city, life_stage: "PUPPY" });

    expect(response.statusCode).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  it("should be able to search pets by city and size", async () => {
    const org = makeOrg();

    await request(app.server).post("/api/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/api/orgs/authenticate")
      .send({
        email: org.email,
        password: org.password,
      });

    // Cria 2 pets
    await request(app.server)
      .post("/api/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet({ size: "TINY" }));

    await request(app.server)
      .post("/api/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet());

    const response = await request(app.server)
      .get("/api/orgs/pets")
      .query({ city: org.city, size: "TINY" });

    expect(response.statusCode).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  it("should be able to search pets by city and energy level", async () => {
    const org = makeOrg();

    await request(app.server).post("/api/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/api/orgs/authenticate")
      .send({
        email: org.email,
        password: org.password,
      });

    // Cria 2 pets
    await request(app.server)
      .post("/api/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet({ energy_level: "LOW" }));

    await request(app.server)
      .post("/api/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makePet());

    const response = await request(app.server)
      .get("/api/orgs/pets")
      .query({ city: org.city, energy_level: "LOW" });

    expect(response.statusCode).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });
});
