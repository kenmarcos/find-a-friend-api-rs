import { beforeEach, describe, expect, it } from "vitest";
import { makeOrg } from "@/tests/factories/make-org.factory";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pet.repository";
import { CreatePetService } from "./create-pet.service";
import { makePet } from "@/tests/factories/make-pet.factory";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: CreatePetService;

describe("Create Pet Service", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreatePetService(petsRepository, orgsRepository);
  });

  it("should be able to create a pet", async () => {
    const org = await orgsRepository.create(makeOrg());

    const { pet } = await sut.execute(makePet({ org_id: org.id }));

    expect(pet.id).toEqual(expect.any(String));
  });
});
