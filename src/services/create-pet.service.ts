import { OrgsRepository } from "@/repositories/orgs.repository";
import { Pet, PetEnergyLevel, PetLifeStage, PetSize } from "@prisma/client";
import { OrgAlreadyExistsError } from "../errors/org-already-exists.error";
import { hash } from "bcryptjs";
import { PetsRepository } from "@/repositories/pet.repository";
import { OrgNotFoundError } from "@/errors/org-not-found.error";

interface CreatePetServiceRequest {
  name: string;
  description: string;
  breed: string;
  life_stage: PetLifeStage;
  size: PetSize;
  energy_level: PetEnergyLevel;
  requirements: string[];
  org_id: string;
}

interface CreatePetServiceResponse {
  pet: Pet;
}

export class CreatePetService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute({
    name,
    description,
    breed,
    life_stage,
    size,
    energy_level,
    requirements,
    org_id,
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const org = await this.orgsRepository.findById(org_id);

    if (!org) {
      throw new OrgNotFoundError();
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      breed,
      life_stage,
      size,
      energy_level,
      requirements,
      org_id,
    });

    return { pet };
  }
}
