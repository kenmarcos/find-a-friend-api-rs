import { InvalidCredentialsError } from "@/errors/invalid-credentials.error";
import { OrgAlreadyExistsError } from "@/errors/org-already-exists.error";
import { makeAuthenticateOrgService } from "@/services/factories/make-authenticate-org-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),

  password: z.string(),
});

export const authenticateOrgController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { email, password } = bodySchema.parse(request.body);

  const authenticateOrgService = makeAuthenticateOrgService();

  try {
    const { org } = await authenticateOrgService.execute({ email, password });

    const token = await reply.jwtSign(
      {},
      {
        sub: org.id,
      }
    );

    return reply.status(201).send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }
  }
};
