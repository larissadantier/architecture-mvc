import type { FastifyInstance } from "fastify";

class UsersModels {
	async findAll(fastify: FastifyInstance) {
		const { rows } = await fastify.pg.query("SELECT * FROM users");

		return rows;
	}

	async findById(fastify: FastifyInstance, id: number) {
		const { rows } = await fastify.pg.query(
			"SELECT * FROM users WHERE id = $1",
			[id],
		);

		return rows[0];
	}

	async create(
		fastify: FastifyInstance,
		payload: { first_name: string; last_name: string; email: string },
	) {
		const result = await fastify.pg.query(
			"INSERT INTO users (first_name, last_name, email) VALUES($1, $2, $3) RETURNING id, first_name, last_name, email",
			[payload.first_name, payload.last_name, payload.email],
		);

		return result.rows[0];
	}
}

export default new UsersModels();
