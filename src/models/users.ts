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
		const { rows } = await fastify.pg.query(
			"INSERT INTO users (first_name, last_name, email) VALUES($1, $2, $3) RETURNING id, first_name, last_name, email",
			[payload.first_name, payload.last_name, payload.email],
		);

		return rows[0];
	}

	async update(
		fastify: FastifyInstance,
		id: number,
		payload: { first_name: string; last_name: string; email: string },
	) {
		const { rows } = await fastify.pg.query(
			"UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *",
			[payload.first_name, payload.last_name, payload.email, id],
		);

		return rows[0];
	}

	async emailExists(fastify: FastifyInstance, email: string) {
		const { rowCount } = await fastify.pg.query(
			"SELECT email FROM users WHERE email = $1 LIMIT 1",
			[email],
		);

		return (rowCount ?? 0) > 0;
	}
}

export default new UsersModels();
