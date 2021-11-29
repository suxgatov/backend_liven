import express from "express";
import { create, read, update, del } from "./users.controller";

const router = express.Router();

router.post("/create", create);

router.get("/read/:id_usuario", read);

router.put("/update", update);

router.delete("/delete/:id_usuario", del);

export default router;