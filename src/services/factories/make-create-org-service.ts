import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs.repository";
import { CreateOrgService } from "../create-org.service";

export const makeCreateOrgService = () => {
  return new CreateOrgService(new PrismaOrgsRepository());
};
