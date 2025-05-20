import type { FastifyPluginAsync } from "fastify";
import UserController from "../controllers/userController";

export const userRoute: FastifyPluginAsync = async (fastify) => {
	fastify.get("/", UserController.index);
	fastify.get("/:id", UserController.show);
	fastify.post("/", UserController.store);
	fastify.put("/:id", UserController.update);
	fastify.delete("/:id", UserController.destroy);
};
