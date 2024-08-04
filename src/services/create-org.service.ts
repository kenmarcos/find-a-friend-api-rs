import { OrgsRepository } from "@/repositories/orgs.repository";
import { Org } from "@prisma/client";
import { OrgAlreadyExistsError } from "../errors/org-already-exists.error";
import { hash } from "bcryptjs";

interface CreateOrgServiceRequest {
  name: string;
  email: string;
  author_name: string;
  zip_code: string;
  street: string;
  number: string;
  state: string;
  city: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  whatsapp: string;
  password: string;
}

interface CreateOrgServiceResponse {
  org: Org;
}

export class CreateOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    author_name,
    zip_code,
    street,
    number,
    state,
    city,
    neighborhood,
    latitude,
    longitude,
    whatsapp,
    password,
  }: CreateOrgServiceRequest): Promise<CreateOrgServiceResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    const passwordHash = await hash(password, 8);

    const org = await this.orgsRepository.create({
      name,
      email,
      author_name,
      whatsapp,
      password: passwordHash,
      zip_code,
      street,
      number,
      state,
      city,
      neighborhood,
      latitude,
      longitude,
    });

    return { org };
  }
}
