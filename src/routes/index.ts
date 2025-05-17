import type { FastifyPluginAsync } from "fastify";
import { privateRoutes } from "./privateRoutes";
import { publicRoutes } from "./publicRoutes";

export const routes: FastifyPluginAsync = async (fastify) => {
	fastify.register(publicRoutes);
	fastify.register(privateRoutes);
};
