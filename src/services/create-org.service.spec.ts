import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrgService } from "./create-org.service";
import { makeOrg } from "@/tests/factories/make-org.factory";
import { OrgAlreadyExistsError } from "@/errors/org-already-exists.error";
import { compare } from "bcryptjs";

let orgsRepository: InMemoryOrgsRepository;
let sut: CreateOrgService;

describe("Create Org Service", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgService(orgsRepository);
  });

  it("should be able to create an org", async () => {
    const { org } = await sut.execute(makeOrg());

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to create an org with an already used email", async () => {
    const orgWithSameEmail = makeOrg();

    await orgsRepository.create(orgWithSameEmail);

    await expect(sut.execute(orgWithSameEmail)).rejects.toBeInstanceOf(
      OrgAlreadyExistsError
    );
  });

  it("should hash org password upon creation", async () => {
    const password = "123456";

    const { org } = await sut.execute(makeOrg({ password }));

    const isPasswordCorrectlyHashed = await compare(password, org.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
