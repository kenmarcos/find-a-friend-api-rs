import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs.repository";
import { AuthenticateOrgService } from "../authenticate-org.service";

export const makeAuthenticateOrgService = () => {
  return new AuthenticateOrgService(new PrismaOrgsRepository());
};
