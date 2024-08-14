import { Pet } from "@prisma/client";
import { PetsRepository } from "@/repositories/pet.repository";
import { PetNotFoundError } from "@/errors/pet-not-found.error";

interface GetPetServiceRequest {
  petId: string;
}

interface GetPetServiceResponse {
  pet: Pet;
}

export class GetPetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetServiceRequest): Promise<GetPetServiceResponse> {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) {
      throw new PetNotFoundError();
    }

    return { pet };
  }
}
