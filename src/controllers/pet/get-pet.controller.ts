import { PetNotFoundError } from "@/errors/pet-not-found.error";
import { makeGetPetService } from "@/services/factories/make-get-pet-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const routeParamSchema = z.object({
  petId: z.string(),
});

export const getPetController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { petId } = routeParamSchema.parse(request.params);

  const getPetService = makeGetPetService();

  try {
    const { pet } = await getPetService.execute({
      petId,
    });

    return reply.send({ pet });
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
  }
};
