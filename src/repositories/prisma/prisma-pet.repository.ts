import { Prisma } from "@prisma/client";
import { FindManyParams, PetsRepository } from "../pet.repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async findById(petId: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    });

    return pet;
  }

  async findMany(params: FindManyParams) {
    const pets = await prisma.pet.findMany({
      where: {
        breed: params.breed,
        life_stage: params.life_stage,
        size: params.size,
        energy_level: params.energy_level,
        org: {
          city: {
            contains: params.city,
            mode: "insensitive",
          },
        },
      },
    });

    return pets;
  }
}
