const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2')
const bcrypt = require('bcrypt');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "suasenha",
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


const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  // Verificar se o arquivo foi enviado
  if (!req.file || req.file.size === 0) {
    return res.status(400).json({
      success: false,
      message: 'O arquivo enviado está vazio.',
    });
  }

  // Se o arquivo não estiver vazio, processá-lo e retornar resultados
  const resultados = {
    'Exame 2': {
      resultado: 'Normal_2',
      parametro: 'mg/dL',
      valor_minimo: '70',
      valor_maximo: '100',
      dentro_limites: true,
    },
  };

  res.status(200).json({ resultados });
});


//IMC

// Rota para calcular o IMC
app.post('/calcularIMC', (req, res) => {
  const { peso, altura } = req.body;

  // Verificar se os campos estão preenchidos
  if (!peso || !altura) {
    return res.status(400).json({ success: false, message: 'Por favor, preencha todos os campos.' });
  }

  // Verificar se os campos estão preenchidos com valores válidos
  if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    return res.status(400).json({ success: false, message: 'Por favor, insira valores válidos para peso e altura.' });
  }

  // Calcular o IMC
  const imc = peso / (altura * altura);

  res.status(200).json({ success: true, imc: imc.toFixed(2) });
});

// Rota para calcular a glicemia
app.post('/calcularGlicemia', (req, res) => {
  const { glicemia } = req.body;

  // Verificar se o campo de glicemia está preenchido
  if (!glicemia) {
    return res.status(400).json({ success: false, message: 'Por favor, preencha todos os campos.' });
  }

  let alerta = false;
  let orientacoes = '';

  // Calcular a glicemia e gerar alerta se estiver fora dos limites saudáveis
  if (glicemia < 70) {
    alerta = true;
    orientacoes = "Glicemia baixa. Seus exames apresentam algum tipo de alteração, é indicado procurar atendimento médico para avaliação.";
  } else if (glicemia < 100) {
    orientacoes = "Glicemia normal.";
  } else if (glicemia >= 100 && glicemia <= 126) {
    alerta = true;
    orientacoes = "Atenção! Seus exames apresentam algum tipo de alteração, é indicado procurar atendimento médico para avaliação.";
  } else if (glicemia > 126) {
    alerta = true;
    orientacoes = "Glicemia alta. Seus exames apresentam algum tipo de alteração, é indicado procurar atendimento médico para avaliação.";
  }

  res.status(200).json({ alerta, orientacoes });
});

// Rota para calcular a pressão arterial
app.post('/calcularPressao', (req, res) => {
  const { sistolica, diastolica } = req.body;

  // Verificar se os campos de sistólica e diastólica estão preenchidos
  if (!sistolica || !diastolica) {
    return res.status(400).json({ success: false, message: 'Por favor, preencha todos os campos.' });
  }

  let alerta = false;
  let orientacoes = '';

  // Calcular a pressão arterial e gerar alerta se estiver fora dos limites saudáveis
  if (sistolica < 120 && diastolica < 80) {
    orientacoes = "Pressão arterial normal. Continue mantendo um estilo de vida saudável!";
  } else if (sistolica >= 120 && sistolica < 130 && diastolica < 80) {
    alerta = true;
    orientacoes = "Pressão arterial elevada. Considere fazer mudanças no estilo de vida.";
  } else if ((sistolica >= 130 && sistolica < 140) || (diastolica >= 80 && diastolica < 90)) {
    alerta = true;
    orientacoes = "Hipertensão estágio 1. Procure orientação médica.";
  } else if (sistolica >= 140 || diastolica >= 90) {
    alerta = true;
    orientacoes = "Hipertensão estágio 2. É importante buscar tratamento médico.";
  } else {
    alerta = true;
    orientacoes = "Crise hipertensiva. Procure atendimento médico imediatamente.";
  }

  res.status(200).json({ alerta, orientacoes });
});

app.post('/saveExam', (req, res) => {
  const { especialidade, dataCons, horario, retorno, lembrete } = req.body;
  const sql = 'INSERT INTO exams (especialidade, dataCons, horario, retorno, lembrete) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [especialidade, dataCons, horario, retorno, lembrete], (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.status(200).send('Exam saved successfully');
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;
