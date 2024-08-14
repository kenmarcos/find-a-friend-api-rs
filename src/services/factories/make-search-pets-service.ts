import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pet.repository";
import { SearchPetsService } from "../search-pets.service";

export const makeSearchPetsService = () => {
  return new SearchPetsService(new PrismaPetsRepository());
};
