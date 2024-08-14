import { PetNotFoundError } from "@/errors/pet-not-found.error";
import { makeGetPetService } from "@/services/factories/make-get-pet-service";
import { makeSearchPetsService } from "@/services/factories/make-search-pets-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const queryParamsSchema = z.object({
  city: z.string(),
  breed: z.string().optional(),
  size: z.enum(["TINY", "SMALL", "MEDIUM", "LARGE"]).optional(),
  energy_level: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  life_stage: z.enum(["PUPPY", "YOUNG", "ADULT", "SENIOR"]).optional(),
});

export const searchPetsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { city, breed, size, energy_level, life_stage } =
    queryParamsSchema.parse(request.query);

  const searchPetsService = makeSearchPetsService();

  const { pets } = await searchPetsService.execute({
    city,
    breed,
    size,
    energy_level,
    life_stage,
  });

  return reply.send({ pets });
};
