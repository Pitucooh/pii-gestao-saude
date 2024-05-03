from flask import Flask, request, jsonify
import pdfplumber
import re

app = Flask(__name__)

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.get_json()
    ap_url = data.get('url')  # Obtém a URL do PDF da requisição POST
    exame_atual = data.get('exame_atual')  # Obtém o nome do exame da requisição POST

    # Abre o arquivo PDF e extrai o texto da primeira página
    with pdfplumber.open(ap_url) as pdf:
        page = pdf.pages[0]
        text = page.extract_text()

    # Utiliza expressão regular para encontrar todos os resultados de exames no texto
    resultados = re.findall(r'(\w+) (\d+,?\d+ [%\w^+/\w+]+)', text)
    resultados = dict(resultados)

    # Obtém o valor do exame desejado
    resultado_exame = resultados.get(exame_atual, 'Exame não encontrado')

    # Retorna o resultado do exame como parte da resposta JSON
    response_data = {'message': resultado_exame}
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
