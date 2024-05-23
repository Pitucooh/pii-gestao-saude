@echo off

REM Obtém o IP da máquina
for /f "tokens=2 delims=:" %%f in ('ipconfig ^| findstr IPv4') do set IP_DA_MAQUINA=%%f

REM Escreve o IP da máquina no arquivo ips.js
echo export const ipMaquina = '%IP_DA_MAQUINA:~1%'; > ips.js

REM O restante do seu script aqui...

echo Instalando as dependências do Expo...
call npm install
call npm install expo-document-picker
echo Dependencies Expo instaladas com sucesso!

echo Iniciando o Expo em um terminal...
start cmd /k npx expo start
echo Expo iniciado com sucesso!

echo Iniciando o servidor em outro terminal...
start cmd /k node .\server.js
echo Servidor iniciado com sucesso!

echo Instalando as dependências do backend e rodando o programa em outro terminal...
call pip install flask werkzeug pdfplumber mysql-connector-python flask-cors
cmd /k "C:/Program Files/Python310/python.exe" python/app.py
echo Backend instalado e programa rodando com sucesso!