import { authenticateOrgController } from "@/controllers/org/authenticate-org.controller";
import { createOrgController } from "@/controllers/org/create-org.controller";
import { FastifyInstance } from "fastify";

export const orgsRoutes = async (app: FastifyInstance) => {
  app.post("/", createOrgController);

  app.post("/authenticate", authenticateOrgController);
};
