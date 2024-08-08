import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs.repository";
import { CreatePetService } from "../create-pet.service";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pet.repository";

export const makeCreatePetService = () => {
  return new CreatePetService(
    new PrismaPetsRepository(),
    new PrismaOrgsRepository()
  );
};
