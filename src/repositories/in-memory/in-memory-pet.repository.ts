import { Pet, Prisma } from "@prisma/client";
import { FindManyParams, PetsRepository } from "../pet.repository";
import { randomUUID } from "node:crypto";
import { InMemoryOrgsRepository } from "./in-memory-orgs.repository";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      ...data,
      requirements: data.requirements as string[],
    };

    this.items.push(pet);

    return pet;
  }

  async findById(petId: string) {
    const pet = this.items.find((pet) => pet.id === petId);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async findMany(params: FindManyParams) {
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === params.city
    );

    const pets = this.items
      .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
      .filter((item) => (params.breed ? item.breed === params.breed : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) =>
        params.energy_level ? item.energy_level === params.energy_level : true
      );

    return pets;
  }
}
