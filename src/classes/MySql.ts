/* eslint-disable handle-callback-err */

// importação de bibliotecas
// -----------------------------------------------------------------------------

import mysql, { MysqlError } from "mysql";
import config from "../config/db";
// -----------------------------------------------------------------------------

// Declaração de variaveis
// -----------------------------------------------------------------------------

// declara a conecão com o banco de dados
const connection = mysql.createPool(config);

// -----------------------------------------------------------------------------

type QueryResult = {
  results: Array<any>;
  error: MysqlError | null;
  fields: any;
};

// Código principal
// -----------------------------------------------------------------------------
class db {
  // função que realiza qualquer tipo de query SQL
  // seu primeiro parametro é a requisição em si
  // o parametro func é a função callback que recebe o resultado da requisição

  async query(query: string) {
    try {
      return new Promise<QueryResult>((resolve) => {
        connection.query(query, (error, results, fields) =>
          resolve({ error, results, fields })
        );
      });
    } catch (error) {
      console.log("Error during database query: ", error);
    }
  }

  async preparedStatement(query: string, params: Array<any>) {
    try {
      return new Promise<QueryResult>((resolve) => {
        connection.query(query, params, (error, results, fields) =>
          resolve({ error, results, fields })
        );
      });
    } catch (error) {
      console.log("Error during database query: ", error);
    }
  }
}
export default new db();
// -----------------------------------------------------------------------------
