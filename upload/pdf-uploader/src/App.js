import React from 'react';
import axios from 'axios';

function App() {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('arquivo pdf enviado com sucesso!');
    } catch (error) {
      console.error('erro ao enviar o arquivo:', error);
    }
  };

  return (
    <div className="App">
      <h1>Upload do exame</h1>
      <p>veyr</p>
      <p>precisa rodar o server flask no fundo</p>
      <input type="file" accept=".pdf" onChange={handleFileUpload} />
    </div>
  );
}

export default App;
