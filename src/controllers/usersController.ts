import type { FastifyReply, FastifyRequest } from "fastify";

import UsersModels from "../models/users";

class UsersControllers {
	async index(req: FastifyRequest, reply: FastifyReply) {
		const users = await UsersModels.findAll(req.server);

		reply.code(200).send(users);
	}

	async show(
		req: FastifyRequest<{ Params: { id: number } }>,
		reply: FastifyReply,
	) {
		const { params } = req;

		if (!params.id) {
			reply.code(400).send({
				code: "USER_ID_REQUIRED",
				message: "O campo 'id' do usuário é obrigatório.",
			});

			return;
		}

		const result = await UsersModels.findById(req.server, Number(params.id));

		reply.code(200).send(result);
	}

	async store(
		req: FastifyRequest<{
			Body: { first_name: string; last_name: string; email: string };
		}>,
		reply: FastifyReply,
	) {
		const { body } = req;

		const result = await UsersModels.create(req.server, body);

		reply.code(201).send(result);
	}

	async update(req: FastifyRequest, reply: FastifyReply) {
		reply.code(200).send({ ok: true });
	}

	async destroy(req: FastifyRequest, reply: FastifyReply) {
		reply.code(200).send({ ok: true });
	}
}

export default new UsersControllers();
