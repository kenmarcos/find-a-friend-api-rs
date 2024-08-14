import {
  Pet,
  PetEnergyLevel,
  PetLifeStage,
  PetSize,
  Prisma,
} from "@prisma/client";
import { PetsRepository } from "../pet.repository";
import { randomUUID } from "node:crypto";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

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
}
