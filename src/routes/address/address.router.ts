import express from "express";
import { create, read, update, del } from "./address.controller";
import { authenticateToken } from "../../middlewares/auth";

const router = express.Router();

router.post("/create", authenticateToken, create);

router.get("/read", authenticateToken, read);

router.get("/read/:id_endereco", authenticateToken, read);

router.put("/update", authenticateToken, update);

router.delete("/delete/:id_endereco", authenticateToken, del);

export default router;
