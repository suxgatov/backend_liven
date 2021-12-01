import { Request, Response } from "express";
import db from "../../classes/MySql";

export async function create(req: Request, res: Response) {
  try {
    const { id_usuario } = req.query;
    const { rua, bairro, numero, cidade, estado, pais } = req.body;

    const query = await db.preparedStatement(
      `
      INSERT INTO enderecos
      (
        id_usuario,
        rua,
        bairro,
        numero,
        cidade,
        estado,
        pais
      )
      VALUES(
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      )
    `,
      [id_usuario, rua, bairro, numero, cidade, estado, pais]
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

function queryString(query: any, field: string): string {
  // id ternario, caso o campo exista, retorna a igualdade dele para a
  // query, caso contrario retorna uma string vazia
  return query[field] ? ` AND ${field} LIKE '%${query[field]}%'` : "";
}

export async function read(req: Request, res: Response) {
  try {
    const { id_usuario } = req.query;
    const { id_endereco } = req.params;

    const query = await db.query(
      `
        SELECT * FROM enderecos 
        WHERE id_usuario = ${id_usuario}
        ${queryString(req.query, "rua")}
        ${queryString(req.query, "bairro")}
        ${queryString(req.query, "numero")}
        ${queryString(req.query, "cidade")}
        ${queryString(req.query, "estado")}
        ${queryString(req.query, "pais")}
        ${id_endereco ? ` AND id_endereco = ${id_endereco} ` : ""}
      `
    );

    if (!query?.error) {
      return res.send(query?.results);
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
    const { id_endereco, rua, bairro, numero, cidade, estado, pais } = req.body;

    const query = await db.preparedStatement(
      `
      UPDATE enderecos SET
        rua = ?,
        bairro = ?,
        numero = ?,
        cidade = ?,
        estado = ?,
        pais = ?
        WHERE id_endereco = ? 
        AND id_usuario = ?
    `,
      [rua, bairro, numero, cidade, estado, pais, id_endereco, id_usuario]
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
    const { id_endereco } = req.params;

    await db.query(
      `DELETE FROM enderecos WHERE id_endereco = ${id_endereco} AND = ${id_usuario}`
    );

    return res.status(200).end();
  } catch (error) {
    return res.status(500).send(error);
  }
}
