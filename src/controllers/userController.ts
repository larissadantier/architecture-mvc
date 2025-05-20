import type { FastifyReply, FastifyRequest } from "fastify";

import UserModel from "../models/user";

class UserController {
	async index(req: FastifyRequest, reply: FastifyReply) {
		const users = await UserModel.findAll(req.server);

		reply.code(200).send({ data: users });
	}

	async show(
		req: FastifyRequest<{ Params: { id: number } }>,
		reply: FastifyReply,
	) {
		const { params } = req;

		if (!params.id) {
			reply.code(400).send({
				code: "USER_ID_PARAM_REQUIRED",
				message: "The param 'id' of user is required.",
			});

			return;
		}

		const user = await UserModel.findById(req.server, Number(params.id));

		if (!user) {
			reply.code(400).send({
				code: "USER_NOT_FOUND",
				message: "No user exists with the given ID.",
			});

			return;
		}

		reply.code(200).send(user);
	}

	async store(
		req: FastifyRequest<{
			Body: { first_name: string; last_name: string; email: string };
		}>,
		reply: FastifyReply,
	) {
		const { body } = req;

		if (!body.first_name || !body.last_name || !body.email) {
			reply.code(400).send({
				code: "REQUIRED_FIELDS_MISSING",
				message: "Some required fields are missing or invalid.",
			});

			return;
		}

		const verifyEmailExists = await UserModel.emailExists(
			req.server,
			body.email,
		);

		if (verifyEmailExists) {
			reply.code(409).send({
				code: "EMAIL_ALREADY_EXISTS",
				message:
					"The e-mail you entered is already registered. Try using a different one.",
			});

			return;
		}

		const result = await UserModel.create(req.server, body);

		reply.code(201).send(result);
	}

	async update(
		req: FastifyRequest<{
			Params: { id: number };
			Body: { first_name: string; last_name: string; email: string };
		}>,
		reply: FastifyReply,
	) {
		const { params, body } = req;

		if (!params.id) {
			reply.code(400).send({
				code: "USER_ID_PARAM_REQUIRED",
				message: "The param 'id' of user is required.",
			});

			return;
		}

		const userExists = await UserModel.findById(req.server, Number(params.id));

		if (!userExists) {
			reply.code(400).send({
				code: "USER_NOT_FOUND",
				message: "No user exists with the given ID.",
			});

			return;
		}

		if (!body.first_name || !body.last_name || !body.email) {
			reply.code(400).send({
				code: "REQUIRED_FIELDS_MISSING",
				message: "Some required fields are missing or invalid.",
			});

			return;
		}

		const verifyEmailExists = await UserModel.emailExists(
			req.server,
			body.email,
		);

		if (verifyEmailExists) {
			reply.code(409).send({
				code: "EMAIL_ALREADY_EXISTS",
				message:
					"The e-mail you entered is already registered. Try using a different one.",
			});

			return;
		}

		const result = await UserModel.update(req.server, params.id, body);

		reply.code(200).send(result);
	}

	async destroy(
		req: FastifyRequest<{ Params: { id: number } }>,
		reply: FastifyReply,
	) {
		const { params } = req;

		if (!params.id) {
			reply.code(400).send({
				code: "USER_ID_PARAM_REQUIRED",
				message: "The param 'id' of user is required.",
			});

			return;
		}

		const userExists = await UserModel.findById(req.server, Number(params.id));

		if (!userExists) {
			reply.code(400).send({
				code: "USER_NOT_FOUND",
				message: "No user exists with the given ID.",
			});

			return;
		}

		await UserModel.delete(req.server, params.id);

		reply.code(204).send({ success: true });
	}
}

export default new UserController();
