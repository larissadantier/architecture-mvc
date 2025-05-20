import type { FastifyPluginAsync } from "fastify";
import { userRoute } from "./userRoute";

export const privateRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.register(userRoute, { prefix: "/users" });
};
