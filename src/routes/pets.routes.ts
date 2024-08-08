import { authenticateOrgController } from "@/controllers/org/authenticate-org.controller";
import { createOrgController } from "@/controllers/org/create-org.controller";
import { createPetController } from "@/controllers/pet/create-pet.controller";
import { verifyJwt } from "@/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export const petsRoutes = async (app: FastifyInstance) => {
  app.post("/pets", { onRequest: [verifyJwt] }, createPetController);
};
