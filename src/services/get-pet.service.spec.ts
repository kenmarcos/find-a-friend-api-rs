import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pet.repository";
import { makePet } from "@/tests/make-pet.factory";
import { GetPetService } from "./get-pet.service";
import { PetNotFoundError } from "@/errors/pet-not-found.error";

let petsRepository: InMemoryPetsRepository;
let sut: GetPetService;

describe("Get Pet Service", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new GetPetService(petsRepository);
  });

  it("should be able to get a pet", async () => {
    const pet = await petsRepository.create(makePet());

    const { pet: foundPet } = await sut.execute({ petId: pet.id });

    expect(foundPet).toEqual(pet);
  });

  it("should not be able to get a non-existing pet", async () => {
    await expect(
      sut.execute({ petId: "non-existing-pet-id" })
    ).rejects.toBeInstanceOf(PetNotFoundError);
  });
});
