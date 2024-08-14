import { Pet, PetEnergyLevel, PetLifeStage, PetSize } from "@prisma/client";
import { PetsRepository } from "@/repositories/pet.repository";
import { PetNotFoundError } from "@/errors/pet-not-found.error";

interface SearchPetsServiceRequest {
  city: string;
  breed?: string;
  life_stage?: PetLifeStage;
  size?: PetSize;
  energy_level?: PetEnergyLevel;
}

interface SearchPetsServiceResponse {
  pets: Pet[];
}

export class SearchPetsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    breed,
    life_stage,
    size,
    energy_level,
  }: SearchPetsServiceRequest): Promise<SearchPetsServiceResponse> {
    const pets = await this.petsRepository.findMany({
      city,
      breed,
      life_stage,
      size,
      energy_level,
    });

    return { pets };
  }
}
