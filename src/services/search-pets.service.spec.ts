import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pet.repository";
import { makePet } from "@/tests/make-pet.factory";
import { SearchPetsService } from "./search-pets.service";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { makeOrg } from "@/tests/make-org.factory";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: SearchPetsService;

describe("Search Pets Service", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new SearchPetsService(petsRepository);
  });

  it("should be able to search pets by city", async () => {
    const org = await orgsRepository.create(makeOrg());

    await petsRepository.create(makePet({ org_id: org.id }));
    await petsRepository.create(makePet({ org_id: org.id }));

    const { pets } = await sut.execute({ city: org.city });

    expect(pets).toHaveLength(2);

    const org2 = await orgsRepository.create(makeOrg());

    await petsRepository.create(makePet({ org_id: org2.id }));

    const { pets: pets2 } = await sut.execute({ city: org2.city });

    expect(pets2).toHaveLength(1);
  });
});
