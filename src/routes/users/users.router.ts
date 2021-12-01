import express from "express";
import { create, read, update, del } from "./users.controller";
import { authenticateToken } from "../../middlewares/auth";

const router = express.Router();

router.post("/create", create);

router.get("/read", authenticateToken, read);

router.put("/update", authenticateToken, update);

router.delete("/delete", authenticateToken, del);

export default router;
