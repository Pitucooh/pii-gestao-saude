const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do MySQL
const db = mysql.createConnection({
  host: "gestao-de-saude.mysql.database.azure.com",
  user: "gestaoadm",
  password: "Wepink123",
  database: "wepink",   
  port: 3306,
});

// Conectar ao MySQL
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados MySQL:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rota de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  // Verificar se os campos estão preenchidos
  if (!email || !senha) {
    return res.status(400).json({ success: false, message: 'Por favor, preencha todos os campos.' });
  }
  
  // Verificar as credenciais no banco de dados
  const query = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Erro ao fazer consulta no banco de dados:', err);
      return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
    }
    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Usuário não encontrado.' });
    }

    const user = results[0];
    // Comparar a senha
    bcrypt.compare(senha, user.senha, (err, result) => {
      if (err) {
        console.error('Erro ao comparar senhas:', err);
        return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
      }
      if (!result) {
        return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
      }

      // Se chegou até aqui, login bem-sucedido
      res.status(200).json({ success: true, message: 'Login bem-sucedido.' });
    });
  });
});

// Rota de cadastro
app.post('/signup', (req, res) => {
  const { nome, email, CPF, senha, confirmeSenha } = req.body;

  // Verificar se os campos estão preenchidos
  if (!nome || !email || !CPF || !senha || !confirmeSenha) {
    return res.status(400).json({ success: false, message: 'Por favor, preencha todos os campos.' });
  }

  // Verificar se o nome contém caracteres válidos
  if (!/^[a-zA-ZÀ-ÿ\s']*$/u.test(nome)) {
    return res.status(400).json({ success: false, message: 'Nome inválido inserido.' });
  }
  
  // Verificar se o CPF está no formato correto
  if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(CPF)) {
    return res.status(400).json({ success: false, message: 'CPF inválido inserido. Por favor, insira no formato xxx.xxx.xxx-xx.' });
  }

  // Verificar se a senha é suficientemente longa
  if (senha.length < 8) {
    return res.status(400).json({ success: false, message: 'Senha muito curta. A senha deve ter no mínimo 8 caracteres.' });
  }

  // Verificar se a senha e a confirmação de senha coincidem
  if (senha !== confirmeSenha) {
    return res.status(400).json({ success: false, message: 'As senhas não coincidem.' });
  }

  // Verificar se o usuário já está cadastrado
  const checkQuery = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error('Erro ao fazer consulta no banco de dados:', err);
      return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
    }
    if (results.length > 0) {
      return res.status(409).json({ success: false, message: 'Este email já está cadastrado.' });
    }

    // Gerar um salt para adicionar à senha
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.error('Erro ao gerar salt:', err);
        return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
      }

      // Usar o salt para hash da senha
      bcrypt.hash(senha, salt, (err, hash) => {
        if (err) {
          console.error('Erro ao gerar hash da senha:', err);
          return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
        }

        // Inserir o novo usuário no banco de dados com a senha criptografada
        const insertQuery = 'INSERT INTO usuarios (nome, email, CPF, senha) VALUES (?, ?, ?, ?)';
        db.query(insertQuery, [nome, email, CPF, hash], (err) => {
          if (err) {
            console.error('Erro ao inserir novo usuário no banco de dados:', err);
            return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
          }
          res.status(201).json({ success: true, message: 'Usuário cadastrado com sucesso.' });
        });
      });
    });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Exportar a instância do servidor Express para uso em outros arquivos
module.exports = app;
