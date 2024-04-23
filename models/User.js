const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nome: String,
    email: String,
    senha: String,
    CPF: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;