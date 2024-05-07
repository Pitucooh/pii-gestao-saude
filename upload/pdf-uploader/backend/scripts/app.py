from flask import Flask, request, jsonify
import os
import pdfplumber
import re

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'  # onde os pdf acabam sendo salvos
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'nenhum arquivo enviado'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'mome de arquivo invalido'}), 400

    if file and file.filename.endswith('.pdf'):
        file.save(os.path.join(UPLOAD_FOLDER, file.filename))
        return jsonify({'message': 'arquivo enviado com sucesso'}), 200
    else:
        return jsonify({'error': 'o arquivo não e um pdf valido'}), 400


#codigo do joao basicamnete
@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.get_json()
    filename = data.get('filename')  # Obtém o nome do arquivo PDF da requisição POST
    exame_atual = data.get('exame_atual')  # Obtém o nome do exame da requisição POST

    pdf_path = os.path.join(UPLOAD_FOLDER, filename)

    #abre o pdf e extrai o texto da primeira página
    with pdfplumber.open(pdf_path) as pdf:
        page = pdf.pages[0]
        text = page.extract_text()

    resultados = re.findall(r'(\w+) (\d+,?\d+ [%\w^+/\w+]+)', text)
    resultados = dict(resultados)

    # Obtém o valor do exame desejado
    resultado_exame = resultados.get(exame_atual, 'Exame não encontrado')

    # Retorna o resultado do exame como parte da resposta JSON
    response_data = {'message': resultado_exame}
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
