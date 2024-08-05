import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs.repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      author_name: data.author_name,
      whatsapp: data.whatsapp,
      password: data.password,
      zip_code: data.zip_code,
      street: data.street,
      number: data.number,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    };

    this.items.push(org);

    return org;
  }

  async findByEmail(email: string) {
    const org = this.items.find((org) => org.email === email);

    if (!org) {
      return null;
    }

    return org;
  }
}
