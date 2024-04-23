const express = require('express');
const router = express.Router();

// mongodb user model
const User = require('./../models/User');

//Password handler
const bcrypt = require('bcrypt');

//Signup 
router.post('/signup', (req, res) => {
    let {nome, email, senha, CPF} = req.body;
    nome = nome.trim();
    email = email.trim();
    senha = senha.trim();
    CPF = CPF.trim();

    if(nome == "" || email == "" || senha == "" || CPF == ""){
        res.json({
            status: "FALHOU",
            message: "Campos de entrada vazios!"
        });
    } else if (!/^[a-zA-ZÀ-ÿ\s]*$/.test(nome)){
        res.json({
            status: "FALHOU",
            message: "Nome inválido inserido"
        })    
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(CPF)){
        res.json({
            status: "FALHOU",
            message: "CPF inválido inserido"
        })
    } else if (senha.length < 8){
        res.json({
            status: "FALHOU",
            message: "Senha muito curta"
        })
    } else{
        //Checking if user already exists
        User.find({email}).then(result =>{
            if (result.length) {
                //A user already exists
                res.json({
                    status: "FALHOU",
                    message: "Usuário com o e-mail fornecido já existe"
                })
            } else {
                //Try to create new user

                //password handling
                const saltRounds = 10;
                bcrypt.hash(senha, saltRounds).then(hashedPassword => {
                    const newUser = new User({
                        nome,
                        email,
                        senha: hashedPassword,
                        CPF
                    })

                    newUser.save().then(result => {
                        res.json({
                            status: "SUCESSO",
                            message: "Cadastro realizado com sucesso",
                            data: result,
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "FALHOU",
                            message: "Um erro ocorreu ao salvar a conta de usuário!"
                        })
                    })
                })
                .catch(err => {
                    res.json({
                        status: "FALHOU",
                        message: "Um erro ocorreu durante o processo de hash da senha!"
                    })
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: "FALHOU",
                message: "Ocorreu um erro ao verificar a existência do usuário!"
            })
        })
    }
})

//Signin
router.post('/signin', (req, res) => {
    let {email, senha} = req.body;
    email = email.trim();
    senha = senha.trim();

    if (email == "" || senha == ""){
        res.json({
            status: "FALHOU",
            message: "Credenciais vazias fornecidas"
        })
    } else{
        //check if user exist
        User.find({email})
        .then(data => {
            if (data.length) {
                //User exists

                const hashedPassword = data[0].senha;
                bcrypt.compare(senha, hashedPassword).then(result => {
                    if (result) {
                        //Password match
                        res.json({
                            status: "SUCESSO",
                            message: "Login efetuado com sucesso",
                            data: data
                        })
                    } else {
                        res.json({
                            status: "FALHOU",
                            message: "Senha inválida!",
                        })
                    }
                })
                .catch(err => {
                    res.json({
                        status: "FALHOU",
                        message: "Um erro ocorreu ao comparar as senhas",
                    })
                })
            } else{
                res.json({
                    status: "FALHOU",
                    message: "Credenciais inválidas fornecidas!",
                })
            }
        })
        .catch(err => {
            res.json({
                status: "FALHOU",
                message: "Um erro ocorreu ao verificar a existência de um usuário!",
            })
        })
    }
})

module.exports = router;