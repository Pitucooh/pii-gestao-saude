from flask import Flask, jsonify, request
import pdfplumber
import re
import mysql.connector

app = Flask(__name__)

# Função para carregar os valores de referência do banco de dados
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


# Função para processar o PDF e verificar os resultados em relação aos valores de referência
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

                        # Inclua 'valor_minimo' no objeto 'info' que será enviado para o frontend
                        resultados_totais[tipo_exame] = {
                            'resultado': primeiro_resultado,
                            'parametro': parametro,
                            'dentro_limites': dentro_limites,
                            'valor_minimo': valor_minimo,
                            'valor_maximo': valor_maximo
                        }

    return resultados_totais


# Rota para processar o PDF e retornar os resultados verificados em relação aos valores de referência
@app.route('/api/processar_pdf', methods=['POST'])
def api_processar_pdf():
    try:
        data = request.get_json()
        pdf_path = data.get('pdf_path')
        
        # Carregar os valores de referência do banco de dados
        valores_referencia = carregar_valores_referencia()
        
        # Processar o PDF e verificar resultados
        resultados = processar_pdf_e_verificar_resultados(pdf_path, valores_referencia)
        
        return jsonify(resultados)

    except Exception as e:
        print(f"Erro durante o processamento do PDF: {str(e)}")
        return jsonify({'error': 'Erro interno no servidor'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
