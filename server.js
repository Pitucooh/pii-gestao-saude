const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Habilitar CORS
app.use(cors({
  origin: '*', // Permite todas as origens, ajuste conforme necessário
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Configuração do MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "matsql",
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
  if (!email || !senha) {
    return res.status(400).json({ success: false, message: 'Por favor, preencha todos os campos.' });
  }

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
    bcrypt.compare(senha, user.senha, (err, result) => {
      if (err) {
        console.error('Erro ao comparar senhas:', err);
        return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
      }
      if (!result) {
        return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
      }

      res.status(200).json({ success: true, message: 'Login bem-sucedido.' });
    });
  });
});

// Rota de cadastro
app.post('/signup', (req, res) => {
  const { nome, email, CPF, senha, confirmeSenha } = req.body;

  if (!nome || !email || !CPF || !senha || !confirmeSenha) {
    return res.status(400).json({ success: false, message: 'Por favor, preencha todos os campos.' });
  }

  if (!/^[a-zA-ZÀ-ÿ\s']*$/u.test(nome)) {
    return res.status(400).json({ success: false, message: 'Nome inválido inserido.' });
  }

  if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(CPF)) {
    return res.status(400).json({ success: false, message: 'CPF inválido inserido. Por favor, insira no formato xxx.xxx.xxx-xx.' });
  }

  if (senha.length < 8) {
    return res.status(400).json({ success: false, message: 'Senha muito curta. A senha deve ter no mínimo 8 caracteres.' });
  }

  if (senha !== confirmeSenha) {
    return res.status(400).json({ success: false, message: 'As senhas não coincidem.' });
  }

  const checkQuery = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error('Erro ao fazer consulta no banco de dados:', err);
      return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
    }
    if (results.length > 0) {
      return res.status(409).json({ success: false, message: 'Este email já está cadastrado.' });
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.error('Erro ao gerar salt:', err);
        return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
      }

      bcrypt.hash(senha, salt, (err, hash) => {
        if (err) {
          console.error('Erro ao gerar hash da senha:', err);
          return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
        }

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

// Configuração do multer para upload de arquivos
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file || req.file.size === 0) {
    return res.status(400).json({ success: false, message: 'O arquivo enviado está vazio.' });
  }

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

// Rota para calcular o IMC
app.post('/calcularIMC', (req, res) => {
  const { peso, altura } = req.body;

  if (!peso || !altura) {
    return res.status(400).json({ success: false, message: 'Por favor, preencha todos os campos.' });
  }

  if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    return res.status(400).json({ success: false, message: 'Por favor, insira valores válidos para peso e altura.' });
  }

  const imc = peso / (altura * altura);
  res.status(200).json({ success: true, imc: imc.toFixed(2) });
});

// Rota para calcular a glicemia
app.post('/calcularGlicemia', (req, res) => {
  const { glicemia } = req.body;

  if (!glicemia) {
    return res.status(400).json({ success: false, message: 'Por favor, preencha todos os campos.' });
  }

  let alerta = false;
  let orientacoes = '';

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

  if (!sistolica || !diastolica) {
    return res.status(400).json({ success: false, message: 'Por favor, preencha todos os campos.' });
  }

  let alerta = false;
  let orientacoes = '';

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


// Rota para salvar exame
app.post('/saveExam', (req, res) => {
  const { especialidade, dataCons, horario, retorno, lembrete } = req.body;

  // Verificar se todos os campos estão preenchidos
  if (!especialidade || !dataCons || !horario || !retorno || !lembrete) {
    return res.status(400).json({ success: false, message: 'Por favor, preencha todos os campos.' });
  }

  // Verificar se a data e o horário estão no formato correto
  const dataPattern = /^\d{2}-\d{2}-\d{4}$/;  // Formato DD-MM-YYYY
  const horarioPattern = /^([01]\d|2[0-3]):([0-5]\d)$/;  // Formato HH:MM

  if (!dataPattern.test(dataCons)) {
    return res.status(400).json({ success: false, message: 'Data no formato inválido. Use o formato DD-MM-YYYY.' });
  }

  if (!horarioPattern.test(horario)) {
    return res.status(400).json({ success: false, message: 'Horário no formato inválido. Use o formato HH:MM.' });
  }

  // Modificar o formato da data para YYYY-MM-DD
  const [dia, mes, ano] = dataCons.split('-');
  const dataFormatada = `${ano}-${mes}-${dia}`;

  const sql = 'INSERT INTO exams (especialidade, dataCons, horario, retorno, lembrete) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [especialidade, dataFormatada, horario, retorno, lembrete], (err, result) => {
    if (err) {
      // console.error('Erro ao inserir exame no banco de dados:', err); // Remova ou comente esta linha
      return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
    }
    res.status(201).json({ success: true, message: 'Exame salvo com sucesso.' });
  });
});

// Iniciar o servidor
const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


// Exportar a instância do servidor Express para uso em outros arquivos
module.exports = app;

module.exports.closeServer = function() {
  server.close();
};