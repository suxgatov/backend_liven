import { Request, Response } from "express";
import db from "../../classes/MySql";
import jwt from "jsonwebtoken";
import config from "../../config/config";
export async function login(req: Request, res: Response) {
  try {
    const { usuario, senha } = req.body;

    const query = await db.preparedStatement(
      `
      SELECT id_usuario 
      FROM usuarios
      WHERE usuario = ?
      AND senha = ?
    `,
      [usuario, senha]
    );
    if (!query?.error) {
      if (query?.results.length) {
        const token = jwt.sign({ ...query?.results[0] }, config.secret, {
          expiresIn: "1h",
        });

        return res.status(200).send({ auth: true, token });
      } else {
        return res.status(200).send({ auth: false });
      }
    } else {
      return res.status(400).send(query?.error);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}
