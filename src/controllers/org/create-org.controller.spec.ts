import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { makeOrg } from "@/tests/make-org.factory";

describe("Create Org (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new org", async () => {
    const response = await request(app.server)
      .post("/api/orgs")
      .send(makeOrg());

    expect(response.statusCode).toBe(201);
  });
});
