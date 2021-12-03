import axios from "axios";
const baseURL = "http://localhost:3000/";
let token = "";
let id_address = "";

it("create user", async () => {
  const response = await axios.post(`${baseURL}user/create`, {
    nome: "Gustavo",
    usuario: "gustavo",
    senha: "123",
  });

  expect(response.status).toBe(200);
});

it("login", async () => {
  const response = await axios.post(`${baseURL}auth/login`, {
    usuario: "gustavo",
    senha: "123",
  });

  expect(response.status).toBe(200);
  expect(response.data.auth).toBeTruthy();

  token = response.data.token;
});

it("update user", async () => {
  const response = await axios.put(
    `${baseURL}user/update`,
    {
      nome: "Gustavo Corradi",
      usuario: "gustavo",
      senha: "123",
    },
    {
      headers: {
        token: token,
      },
    }
  );

  expect(response.status).toBe(200);
});

it("create address", async () => {
  const response = await axios.post(
    `${baseURL}address/create`,
    {
      rua: "Av. Brasil",
      bairro: "Centro",
      numero: "1384",
      cidade: "Lençóis Paulista",
      estado: "SP",
      pais: "BR",
    },
    {
      headers: {
        token: token,
      },
    }
  );

  expect(response.status).toBe(200);
});

it("create second address", async () => {
  const response = await axios.post(
    `${baseURL}address/create`,
    {
      rua: "Av. Brasil 2",
      bairro: "Centro",
      numero: "1384",
      cidade: "Lençóis Paulista",
      estado: "SP",
      pais: "BR",
    },
    {
      headers: {
        token: token,
      },
    }
  );

  expect(response.status).toBe(200);
});

it("read second address", async () => {
  // get second address through query stream
  const response = await axios.get(`${baseURL}address/read?rua=2`, {
    headers: {
      token: token,
    },
  });

  expect(response.status).toBe(200);
  expect(response.data[0].rua).toEqual("Av. Brasil 2");

  id_address = response.data[0].id_endereco;
});

it("update second address and check if updated", async () => {
  const response = await axios.put(
    `${baseURL}address/update`,
    {
      id_endereco: id_address,
      rua: "Av. Brasil 2 Editado",
      bairro: "Centro",
      numero: "1384",
      cidade: "Lençóis Paulista",
      estado: "SP",
      pais: "BR",
    },
    {
      headers: {
        token: token,
      },
    }
  );

  expect(response.status).toBe(200);

  // get address through param
  const readResponse = await axios.get(`${baseURL}address/read/${id_address}`, {
    headers: {
      token: token,
    },
  });

  expect(readResponse.status).toBe(200);
  expect(readResponse.data[0].rua).toEqual("Av. Brasil 2 Editado");
});

it("delete second address", async () => {
  const response = await axios.delete(
    `${baseURL}address/delete/${id_address}`,
    {
      headers: {
        token: token,
      },
    }
  );

  expect(response.status).toBe(200);
});

it("read user", async () => {
  const response = await axios.get(`${baseURL}user/read`, {
    headers: {
      token: token,
    },
  });

  expect(response.status).toBe(200);
  // name after update
  expect(response.data.nome).toEqual("Gustavo Corradi");

  // amount of addresses after delete
  expect(response.data.enderecos.length).toBe(1);
});

it("delete user", async () => {
  const response = await axios.delete(`${baseURL}user/delete`, {
    headers: {
      token: token,
    },
  });

  expect(response.status).toBe(200);
});
