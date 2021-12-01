import { Request, Response } from "express";
import db from "../../classes/MySql";

export async function create(req: Request, res: Response) {
  try {
    const { nome, usuario, senha } = req.body;

    const query = await db.preparedStatement(
      `
      INSERT INTO usuarios
      (
        nome,
        usuario,
        senha
      )
      VALUES(
        ?,
        ?,
        ?
      )
    `,
      [nome, usuario, senha]
    );

    if (!query?.error) {
      return res.status(200).end();
    } else {
      return res.status(400).send(query?.error);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function read(req: Request, res: Response) {
  try {
    const { id_usuario } = req.query;
    const query = await db.query(
      `SELECT * FROM usuarios WHERE id_usuario = ${id_usuario}`
    );

    const query2 = await db.query(
      `SELECT * FROM enderecos WHERE id_usuario = ${id_usuario}`
    );

    if (!query?.error && !query2?.error) {
      if (query?.results.length) {
        return res.send({ ...query?.results[0], enderecos: query2?.results });
      } else {
        return res.status(404).send("User not found");
      }
    } else {
      return res.status(400).send(query?.error);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function update(req: Request, res: Response) {
  try {
    const { id_usuario } = req.query;
    const { nome, usuario, senha } = req.body;

    const query = await db.preparedStatement(
      `
      UPDATE usuarios SET
        nome = ?,
        usuario = ?,
        senha = ?
        WHERE id_usuario = ? 
    `,
      [nome, usuario, senha, id_usuario]
    );

    if (!query?.error) {
      return res.status(200).end();
    } else {
      return res.status(400).send(query?.error);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function del(req: Request, res: Response) {
  try {
    const { id_usuario } = req.query;

    await db.query(`DELETE FROM enderecos WHERE id_usuario = ${id_usuario}`);

    await db.query(`DELETE FROM usuarios WHERE id_usuario = ${id_usuario}`);

    return res.status(200).end();
  } catch (error) {
    return res.status(500).send(error);
  }
}
