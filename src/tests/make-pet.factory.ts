import { faker } from "@faker-js/faker";
import { PetEnergyLevel, PetLifeStage, PetSize } from "@prisma/client";
import { randomUUID } from "node:crypto";

interface Overwrite {
  org_id?: string;
}

export const makePet = (overwrite?: Overwrite) => {
  return {
    id: randomUUID(),
    name: faker.animal.dog(),
    description: faker.lorem.lines(3),
    breed: faker.animal.dog(),
    life_stage: faker.helpers.arrayElement([
      "PUPPY",
      "YOUNG",
      "ADULT",
      "SENIOR",
    ]) as PetLifeStage,
    size: faker.helpers.arrayElement([
      "TINY",
      "SMALL",
      "MEDIUM",
      "LARGE",
    ]) as PetSize,
    energy_level: faker.helpers.arrayElement([
      "LOW",
      "MEDIUM",
      "HIGH",
    ]) as PetEnergyLevel,
    requirements: [faker.lorem.word()],
    org_id: overwrite?.org_id ?? randomUUID(),
  };
};
