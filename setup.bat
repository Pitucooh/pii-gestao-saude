@echo off

REM Obtém o IP da máquina
REM for /f "tokens=2 delims=:" %%f in ('ipconfig ^| findstr IPv4') do set IP_DA_MAQUINA=%%f

REM Escreve o IP da máquina no arquivo ips.js
echo export const ipMaquina = 'localhost'; > ips.js

echo Instalando as dependências do Expo...
call npm install
call npm install expo-document-picker
call npm install mysql2
echo Dependencies Expo instaladas com sucesso!

echo Instalando as dependências do backend e rodando o programa em outro terminal...
call pip install flask werkzeug pdfplumber mysql-connector-python flask-cors
call pip install mysql-connector-python