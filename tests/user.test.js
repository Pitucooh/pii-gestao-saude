const request = require('supertest');
const express = require('express');
const app = require('./../server');

// TESTES LOGIN

describe('Testes de Login', () => {
  it('Deve retornar status 200 e uma mensagem de sucesso ao fazer login com credenciais corretas', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'verina@gmail.com', senha: 'teste123' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Login bem-sucedido.');
  });

  it('Deve retornar status 401 e uma mensagem de erro ao fazer login com credenciais incorretas', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'verina@gmail.com', senha: 'senha-incorreta' });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Credenciais inválidas.');
  });

});

// TESTES CADASTRO 

describe('Testes de Cadastro', () => {
  it('Deve retornar status 201 e uma mensagem de sucesso ao cadastrar um novo usuário com CPF válido', async () => {
    const response = await cadastrarUsuario('João Silva', 'joao@gmail.com', '123.456.789-01', 'senha123', 'senha123');
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Usuário cadastrado com sucesso.');
  });

  it('Deve retornar status 400 e uma mensagem de erro ao cadastrar um novo usuário com CPF inválido', async () => {
    const response = await cadastrarUsuario('Maria Oliveira', 'maria@gmail.com', '12345678900', 'senha123', 'senha123');
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('CPF inválido inserido. Por favor, insira no formato xxx.xxx.xxx-xx.');
  });

  it('Deve retornar status 400 e uma mensagem de erro ao cadastrar um novo usuário com senha muito curta', async () => {
    const response = await cadastrarUsuario('Carlos Santos', 'carlos@gmail.com', '987.654.321-00', '123', '123');
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Senha muito curta. A senha deve ter no mínimo 8 caracteres.');
  });

  it('Deve retornar status 400 e uma mensagem de erro ao cadastrar um novo usuário com senhas que não coincidem', async () => {
    const response = await cadastrarUsuario('Ana Pereira', 'ana@gmail.com', '654.321.987-00', 'senha123', 'outraSenha');
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('As senhas não coincidem.');
  });
});


// Função auxiliar para cadastro de usuário
async function cadastrarUsuario(nome, email, CPF, senha, confirmeSenha) {
  return await request(app)
    .post('/signup')
    .send({ nome, email, CPF, senha, confirmeSenha});
}
