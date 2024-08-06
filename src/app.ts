import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { orgsRoutes } from "./routes/orgs.routes";
import fastifyJwt from "@fastify/jwt";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET, // palavra-chave secreta para criar o token JWT
});

app.register(orgsRoutes, { prefix: "/api/orgs" });

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation Error.", issues: error.format() });
  }

  if (env.NODE_ENV === "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal Server Error." });
});
