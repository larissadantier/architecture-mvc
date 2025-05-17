import fastifyPostgres from "@fastify/postgres";
import Fastify from "fastify";

import { routes } from "./routes";

export const fastify = Fastify({
	logger: true,
});

console.log(process.env.DEV_DATABASE_URL);

fastify.register(fastifyPostgres, {
	connectionString: process.env.DEV_DATABASE_URL,
});

fastify.register(routes);

fastify.setErrorHandler((error, _, reply) => {
	reply.code(500).send({ error: error.message });
});

function init() {
	fastify.listen({ port: 3000, host: "0.0.0.0" }, (err) => {
		if (err) {
			fastify.log.error(err);
			process.exit(1);
		}

		fastify.log.info("🔥 Server Running on port 3000");
	});
}

init();
