import { OrgAlreadyExistsError } from "@/errors/org-already-exists.error";
import { makeCreateOrgService } from "@/services/factories/make-create-org-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  author_name: z.string(),
  whatsapp: z.string(),
  password: z.string(),
  zip_code: z.string(),
  street: z.string(),
  number: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

export const createOrgController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const body = bodySchema.parse(request.body);

  const createOrgService = makeCreateOrgService();

  try {
    const { org } = await createOrgService.execute(body);

    return reply.status(201).send({
      org: {
        ...org,
        password: undefined,
      },
    });
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
  }
};
