import { faker } from "@faker-js/faker";
import { randomUUID } from "node:crypto";

interface Overwrite {
  password?: string;
}

export const makeOrg = (overwrite?: Overwrite) => {
  return {
    id: randomUUID(),
    name: faker.company.name(),
    email: faker.internet.email(),
    author_name: faker.person.fullName(),
    whatsapp: faker.phone.number(),
    password: overwrite?.password ?? faker.internet.password(),
    zip_code: faker.location.zipCode(),
    street: faker.location.street(),
    number: faker.location.buildingNumber(),
    state: faker.location.state(),
    city: faker.location.city(),
    neighborhood: faker.location.streetAddress(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
  };
};
