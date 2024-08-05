import { InvalidCredentialsError } from "@/errors/invalid-credentials.error";
import { OrgsRepository } from "@/repositories/orgs.repository";
import { Org } from "@prisma/client";
import { compare } from "bcryptjs";

interface AuthenticateOrgServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateOrgServiceResponse {
  org: Org;
}

export class AuthenticateOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgServiceRequest): Promise<AuthenticateOrgServiceResponse> {
    const orgByEmail = await this.orgsRepository.findByEmail(email);

    if (!orgByEmail) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, orgByEmail.password);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { org: orgByEmail };
  }
}
