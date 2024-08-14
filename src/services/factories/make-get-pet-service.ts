import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pet.repository";
import { GetPetService } from "../get-pet.service";

export const makeGetPetService = () => {
  return new GetPetService(new PrismaPetsRepository());
};
