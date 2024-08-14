import { createPetController } from "@/controllers/pet/create-pet.controller";
import { getPetController } from "@/controllers/pet/get-pet.controller";
import { searchPetsController } from "@/controllers/pet/search-pets.controller";
import { verifyJwt } from "@/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export const petsRoutes = async (app: FastifyInstance) => {
  app.post("/pets", { onRequest: [verifyJwt] }, createPetController);
  app.get("/pets/:petId", getPetController);
  app.get("/pets", searchPetsController);
};
