import "dotenv/config";

import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";
import { Environment } from "vitest/environments";
import { PrismaClient } from "@prisma/client";
import { env } from "@/env";

const prisma = new PrismaClient();

function generateDatabaseURL(schema: string) {
  if (!env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable.");
  }

  const url = new URL(env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    // Mudar o banco de dados para cada arquivo/switch de testes
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);

    env.DATABASE_URL = databaseURL;

    execSync("npx prisma migrate deploy");

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        );

        await prisma.$disconnect();
      },
    };
  },
};
