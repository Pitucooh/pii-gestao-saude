from flask import Flask, request, send_from_directory
from flask_cors import CORS
import os
import subprocess
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

app = Flask(__name__, static_folder='uploads')
CORS(app)

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def execute_python_script(filename):
    script_path = os.path.join(os.getcwd(), 'scripts', 'process_pdf.py')
    subprocess.Popen(['python', script_path, os.path.join(UPLOAD_FOLDER, filename)])

class MyHandler(FileSystemEventHandler):
    def on_created(self, event):
        if event.is_directory:
            return
        filename = os.path.basename(event.src_path)
        if filename.endswith('.pdf'):
            execute_python_script(filename)

observer = Observer()
observer.schedule(MyHandler(), path=UPLOAD_FOLDER, recursive=False)
observer.start()

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'Nenhum arquivo enviado', 400

    file = request.files['file']
    if file.filename == '':
        return 'Nome de arquivo inválido', 400

    file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    return 'Arquivo salvo com sucesso', 200

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)
