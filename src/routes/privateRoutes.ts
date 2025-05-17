import type { FastifyPluginAsync } from "fastify";
import { usersRoutes } from "./usersRoutes";

export const privateRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.register(usersRoutes, { prefix: "/users" });
};
