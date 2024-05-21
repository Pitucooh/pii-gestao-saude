const request = require('supertest');
const express = require('express');
const app = require('./../server');

// TESTES LOGIN

describe('Testes de Login', () => {
  it('Deve retornar status 200 e uma mensagem de sucesso ao fazer login com credenciais corretas', async () => {
    // Funcionalidade: Login no aplicativo
    // Cenário: Login bem-sucedido
    // Dado que o usuário está na página de login
    // Quando o usuário insere suas credenciais corretas e clica em "Entrar"
    const response = await request(app)
      .post('/login')
      .send({ email: 'verina@gmail.com', senha: 'teste123' });

    // Então o usuário deve ser redirecionado para a página principal
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Login bem-sucedido.');
  });

  it('Deve retornar status 401 e uma mensagem de erro ao fazer login com credenciais incorretas', async () => {
    // Cenário: Tentativa de login com credenciais incorretas
    // Dado que o usuário está na página de login
    // Quando o usuário insere suas credenciais incorretas e clica em "Entrar"
    const response = await request(app)
      .post('/login')
      .send({ email: 'verina@gmail.com', senha: 'senha-incorreta' });

    // Então o usuário deve receber mensagem de erro indicando credenciais inválidas
    // E o usuário não deve ser redirecionado para a página principal
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Credenciais inválidas.');
  });

});

// TESTES CADASTRO 

describe('Testes de Cadastro', () => {
  it('Deve retornar status 201 e uma mensagem de sucesso ao cadastrar um novo usuário com CPF válido', async () => {
    // Funcionalidade: Cadastro de Usuário
    // Cenário: Cadastro bem-sucedido
    // Dado que sou um visitante
    // Quando eu preencher e enviar o formulário de cadastro corretamente
    const response = await cadastrarUsuario('Marcos Pedro', 'marcos@gmail.com', '123.456.789-01', 'senha123', 'senha123');
    // Então devo receber uma mensagem de sucesso indicando que o cadastro foi realizado com sucesso
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Usuário cadastrado com sucesso.');
  });

  it('Deve retornar status 400 e uma mensagem de erro ao cadastrar um novo usuário com CPF inválido', async () => {
    // Cenário: Cadastro com CPF inválido
    // Dado que sou um visitante
    // Quando eu preencher e enviar o formulário de cadastro com um CPF inválido
    const response = await cadastrarUsuario('Maria Oliveira', 'maria@gmail.com', '12345678900', 'senha123', 'senha123');
    // Então devo receber uma mensagem de erro indicando que o CPF inserido é inválido
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('CPF inválido inserido. Por favor, insira no formato xxx.xxx.xxx-xx.');
  });

  it('Deve retornar status 400 e uma mensagem de erro ao cadastrar um novo usuário com senha muito curta', async () => {
    // Cenário: Cadastro com senha muito curta
    // Dado que sou um visitante
    // Quando eu preencher e enviar o formulário de cadastro com uma senha muito curta
    const response = await cadastrarUsuario('Carlos Santos', 'carlos@gmail.com', '987.654.321-00', '123', '123');
    // Então devo receber uma mensagem de erro indicando que a senha é muito curta
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Senha muito curta. A senha deve ter no mínimo 8 caracteres.');
  });

  it('Deve retornar status 400 e uma mensagem de erro ao cadastrar um novo usuário com senhas que não coincidem', async () => {
    // Cenário: Cadastro com senhas que não coincidem
    // Dado que sou um visitante
    // Quando eu preencher e enviar o formulário de cadastro com senhas que não coincidem
    const response = await cadastrarUsuario('Ana Pereira', 'ana@gmail.com', '654.321.987-00', 'senha123', 'outraSenha');
    // Então devo receber uma mensagem de erro indicando que as senhas não coincidem
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

// TESTES DE EXAMES

    // Funcionalidade: Verificar resultados
    // Dado que sou um usuário do aplicativo de gestão de saúde  
    // Quando eu acessar a seção de resultados de exames  
  describe('Testes de Upload de Exames', () => {
  it('Deve fazer upload de um arquivo PDF e retornar os resultados', async () => {
    const filePath = 'C:\\Users\\verin\\OneDrive\\Documentos\\GitHub\\gestao\\Laudo Completo 22_12_2023.pdf';  

    const response = await request(app)
      .post('/upload')
      .attach('file', filePath)
      .set('Content-Type', 'multipart/form-data');

    //Então devo ser direcionado para uma página onde todos os meus resultados de exames estejam listados, de acordo com a referência  
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('resultados');
    expect(response.body.resultados).toBeInstanceOf(Object);
  });

    // Funcionalidade: Verificar exames 
    // Dado que sou um usuário logado no aplicativo de gestão de saúde
    // Quando eu tentar fazer o upload de um arquivo PDF vazio

  it('Deve retornar erro se o PDF estiver vazio', async () => {
    const fs = require('fs');
    const path = require('path');
  
    // Crie um arquivo PDF vazio temporário
    const emptyPDFPath = path.join(__dirname, 'empty.pdf');
    fs.writeFileSync(emptyPDFPath, '');
  
    // Faça o upload do arquivo PDF vazio
    const response = await request(app)
      .post('/upload')
      .attach('file', emptyPDFPath)
      .set('Content-Type', 'multipart/form-data');

    // Então devo receber uma mensagem de erro indicando que o arquivo está vazio
    // Verifique se a resposta é um erro 400
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('O arquivo enviado está vazio.');
  });
  
});
