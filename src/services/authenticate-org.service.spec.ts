import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateOrgService } from "./authenticate-org.service";
import { makeOrg } from "@/tests/factories/make-org.factory";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "@/errors/invalid-credentials.error";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateOrgService;

describe("Authenticate Org Service", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateOrgService(orgsRepository);
  });

  it("should be able to authenticate an org", async () => {
    const password = "123456";

    const org = await orgsRepository.create(
      makeOrg({ password: await hash(password, 8) })
    );

    const { org: autheticatedOrg } = await sut.execute({
      email: org.email,
      password,
    });

    expect(autheticatedOrg.id).toEqual(org.id);
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(
      sut.execute({
        email: "wrong_email@mail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const password = "123456";

    const org = await orgsRepository.create(
      makeOrg({ password: await hash(password, 8) })
    );

    await expect(
      sut.execute({
        email: org.email,
        password: "wrong-password",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
