import type { FastifyPluginAsync } from "fastify";
import usersController from "../controllers/usersController";

export const usersRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.get("/", usersController.index);
	fastify.get("/:id", usersController.show);
	fastify.post("/", usersController.store);
	fastify.put("/:id", usersController.update);
	fastify.delete("/:id", usersController.destroy);
};
