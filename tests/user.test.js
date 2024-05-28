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
    const response = await cadastrarUsuario('Carlos', 'carlos@gmail.com', '123.456.789-01', 'teste123', 'teste123');
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

// TESTES DE IMC
describe('Testes de IMC', () => {
  it('Deve calcular o IMC corretamente quando peso e altura são fornecidos', async () => {
    // Funcionalidade: Dados do IMC
    // Cenário: Inserir e monitorar peso e altura
    // Dado que sou um usuário do aplicativo de gestão de saúde
    // Quando eu inserir informações sobre meu peso e altura
    const response = await request(app)
      .post('/calcularIMC')
      .send({ peso: 70, altura: 1.75 });

    // Então eu devo poder visualizar meu IMC calculado
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.imc).toBe('22.86'); // 70 / (1.75 * 1.75) = 22.857142857142858
  });

  it('Deve retornar erro se peso e/ou altura forem fornecidos em branco', async () => {
    // Funcionalidade: Dados do IMC
    // Cenário: Tentativa de inserir informações em branco de peso e/ou altura
    // Dado que sou um usuário do aplicativo de gestão de saúde
    // Quando eu inserir informações em branco de peso e/ou altura
    const response = await request(app)
      .post('/calcularIMC')
      .send({ peso: '', altura: '' });

    // Então eu devo receber uma mensagem de erro indicando para preencher todos os campos
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Por favor, preencha todos os campos.');
  });
});

// TESTES DE GLICEMIA
describe('Testes de Glicemia', () => {
    it('Deve inserir e monitorar a glicemia corretamente quando os valores estão fora dos limites saudáveis', async () => {
    // Funcionalidade: Dados da Glicemia
    // Cenário: Inserir e monitorar glicemia com valores fora dos limites saudáveis
    // Dado que sou um usuário do aplicativo de gestão de saúde
    // Quando eu inserir informações sobre minha glicemia
    // E os valores de glicemia estiverem fora dos limites saudáveis
    const response = await request(app)
      .post('/calcularGlicemia')
      .send({ glicemia: 140 });

    // Então o aplicativo deve gerar um alerta
    // E fornecer orientações sobre ações a serem tomadas
    expect(response.status).toBe(200);
    expect(response.body.alerta).toBe(true);
    expect(response.body.orientacoes).toBeTruthy(); // Verificar se as orientações não estão vazias
  });

  it('Deve retornar erro se a glicemia estiver em branco', async () => {
    // Funcionalidade: Dados da Glicemia
    // Cenário: Tentativa de inserir informações em branco de glicemia
    // Dado que sou um usuário do aplicativo de gestão de saúde
    // Quando eu inserir informações em branco de glicemia
    const response = await request(app)
      .post('/calcularGlicemia')
      .send({ glicemia: '' });

    // Então o aplicativo deve retornar uma mensagem de erro indicando que todos os campos devem ser preenchidos
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Por favor, preencha todos os campos.');
  });
});

// TESTES DE PRESSÃO ARTERIAL
describe('Testes de Pressão Arterial', () => {
  it('Deve inserir e monitorar a pressão arterial corretamente quando os valores estão fora dos limites saudáveis', async () => {
      // Cenário: Inserir e monitorar pressão arterial com valores fora dos limites saudáveis
      // Dado que sou um usuário do aplicativo de gestão de saúde
      // Quando eu inserir informações sobre minha pressão arterial
      // E os valores de pressão arterial estiverem fora dos limites saudáveis
      const response = await request(app)
          .post('/calcularPressao')
          .send({ sistolica: 140, diastolica: 90 });

      // Então o aplicativo deve gerar um alerta
      // E fornecer orientações sobre ações a serem tomadas
      expect(response.status).toBe(200);
      expect(response.body.alerta).toBe(true);
      expect(response.body.orientacoes).toBeTruthy(); // Verificar se as orientações não estão vazias
  });

  it('Deve retornar erro se a sistólica estiver em branco', async () => {
      // Cenário: Tentativa de inserir informações em branco de sistólica
      // Dado que sou um usuário do aplicativo de gestão de saúde
      // Quando eu inserir informações em branco de sistólica
      const response = await request(app)
          .post('/calcularPressao')
          .send({ sistolica: '', diastolica: 80 });

      // Então o aplicativo deve retornar uma mensagem de erro indicando que todos os campos devem ser preenchidos
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Por favor, preencha todos os campos.');
  });

  it('Deve retornar erro se a diastólica estiver em branco', async () => {
      // Cenário: Tentativa de inserir informações em branco de diastólica
      // Dado que sou um usuário do aplicativo de gestão de saúde
      // Quando eu inserir informações em branco de diastólica
      const response = await request(app)
          .post('/calcularPressao')
          .send({ sistolica: 120, diastolica: '' });

      // Então o aplicativo deve retornar uma mensagem de erro indicando que todos os campos devem ser preenchidos
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Por favor, preencha todos os campos.');
  });
  
  afterAll(() => {
    closeServer();
  });
});
