# PII - Gestão de Saúde

## Descrição

O projeto "Gestão de Saúde" é um sistema desenvolvido para auxiliar na gestão de informações relacionadas à saúde, oferecendo funcionalidades como autenticação de usuários, cadastro de dados e integração com banco de dados.

## Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- React Native

## Servidor Node.js

O servidor Node.js fornece endpoints para autenticação (login e cadastro) dos usuários, bem como integração com um banco de dados MySQL para armazenar informações dos usuários.

### Execução do Servidor

1. Certifique-se de ter o Node.js e o MySQL instalados em sua máquina.
2. Configure as credenciais do banco de dados no arquivo `server.js`.
3. Execute `npm install` para instalar as dependências.
4. Execute `npm start` para iniciar o servidor.

## Testes

Os testes foram implementados utilizando a abordagem de Desenvolvimento Orientado a Testes (TDD) com as ferramentas Mocha, Chai e Supertest.

### Execução dos Testes

1. Certifique-se de que o servidor não esteja em execução.
2. Execute `npm test` no terminal.
3. Os resultados dos testes serão exibidos no terminal.

### Cobertura de Testes

Atualmente, os testes abrangem as rotas de login e cadastro do servidor, garantindo que as funcionalidades principais estejam funcionando corretamente. Mais testes podem ser adicionados para cobrir outras partes do sistema, conforme necessário.

