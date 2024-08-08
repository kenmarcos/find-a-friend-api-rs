import { OrgNotFoundError } from "@/errors/org-not-found.error";
import { makeCreatePetService } from "@/services/factories/make-create-pet-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string(),
  description: z.string(),
  breed: z.string(),
  life_stage: z.enum(["PUPPY", "YOUNG", "ADULT", "SENIOR"]),
  size: z.enum(["TINY", "SMALL", "MEDIUM", "LARGE"]),
  energy_level: z.enum(["LOW", "MEDIUM", "HIGH"]),
  requirements: z.array(z.string()),
});

export const createPetController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const body = bodySchema.parse(request.body);

  const createPetService = makeCreatePetService();

  try {
    const { pet } = await createPetService.execute({
      ...body,
      org_id: request.user.sub,
    });

    return reply.status(201).send({ pet });
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
  }
};
