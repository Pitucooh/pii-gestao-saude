from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import json
import pdfplumber
import re
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = r'uploads/exames'
RESULT_FOLDER = r'resultados'
ALLOWED_EXTENSIONS = {'pdf'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULT_FOLDER'] = RESULT_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

if not os.path.exists(RESULT_FOLDER):
    os.makedirs(RESULT_FOLDER)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def carregar_valores_referencia():
    try:
        conn = mysql.connector.connect(
            host='gestao-de-saude.mysql.database.azure.com',
            user='gestaoadm',
            password='Wepink123',
            database='wepink'
        )
        cursor = conn.cursor()
        query = "SELECT tipo_exame, valor_minimo, valor_maximo, parametro FROM referencia_exames"
        cursor.execute(query)
        valores_referencia = {}
        for tipo_exame, valor_minimo, valor_maximo, parametro in cursor.fetchall():
            valores_referencia[tipo_exame] = {
                'valor_minimo': valor_minimo,
                'valor_maximo': valor_maximo,
                'parametro': parametro
            }
        return valores_referencia
    except mysql.connector.Error as error:
        print(f"Erro ao acessar o banco de dados: {error}")
        return {}
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals() and conn.is_connected():
            conn.close()

def processar_pdf_e_verificar_resultados(pdf_path, valores_referencia):
    with pdfplumber.open(pdf_path) as pdf:
        resultados_totais = {}
        for page in pdf.pages:
            text = page.extract_text()
            inv_line_re = re.compile(r'([\w\-\, ]+) (\d+,?.?\d+)')
            for line in text.split('\n'):
                match = inv_line_re.search(line)
                if match:
                    tipo_exame, resultado = match.group(1).strip(), match.group(2).strip()
                    if tipo_exame in valores_referencia:
                        primeiro_resultado = float(resultado.replace(',', '.'))
                        info_referencia = valores_referencia[tipo_exame]
                        valor_minimo = info_referencia['valor_minimo']
                        valor_maximo = info_referencia['valor_maximo']
                        parametro = info_referencia['parametro']
                        dentro_limites = valor_minimo <= primeiro_resultado <= valor_maximo

                        resultados_totais[tipo_exame] = {
                            'resultado': primeiro_resultado,
                            'parametro': parametro,
                            'dentro_limites': dentro_limites,
                            'valor_minimo': valor_minimo,
                            'valor_maximo': valor_maximo
                        }
    return resultados_totais

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Carregar os valores de referência do banco de dados
        valores_referencia = carregar_valores_referencia()
        
        # Processar o PDF e verificar resultados
        resultados = processar_pdf_e_verificar_resultados(file_path, valores_referencia)
        
        # Salvar os resultados em um arquivo JSON na pasta "resultados"
        result_filename = f'result_{os.path.splitext(filename)[0]}.json'
        result_filepath = os.path.join(app.config['RESULT_FOLDER'], result_filename)
        with open(result_filepath, 'w') as result_file:
            json.dump(resultados, result_file, ensure_ascii=False, indent=4)
        
        return jsonify({'message': 'File uploaded and processed successfully', 'filename': filename, 'resultados': resultados})

    return jsonify({'error': 'Invalid file'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
