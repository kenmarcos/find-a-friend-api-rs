import {
  Pet,
  PetEnergyLevel,
  PetLifeStage,
  PetSize,
  Prisma,
} from "@prisma/client";

export interface FindManyParams {
  city: string;
  breed?: string;
  life_stage?: PetLifeStage;
  size?: PetSize;
  energy_level?: PetEnergyLevel;
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(petId: string): Promise<Pet | null>;
  findMany(params: FindManyParams): Promise<Pet[]>;
}
