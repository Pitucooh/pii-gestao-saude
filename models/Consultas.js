const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConsultasSchema = new Schema({
    especialidade: String,
    data: String, 
    hora: String,
    resumoCons: String,
    retorno: String,
    lembreteAgnd: String
});

const Consultas = mongoose.model('Consultas', ConsultasSchema);

module.exports = Consultas;