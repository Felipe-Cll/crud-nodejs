const express = require('express');
const server = express();

server.use(express.json());

const futebol = ['Brasil', 'Argentina', 'EUA'];

// CRUD -> Create, Read, Update, Delete

// Para retornar a um time
server.get('/futebol/:index', (req, res) => {
    const {index} = req.params;

    return res.json(futebol[index]);
});

// Para retornar a todos os times
server.get('/futebol', (req, res) => {
    return res.json(futebol);
});

// Criar um novo time
server.post('/futebol', (req, res) => {
    const {name} = req.body;
    futebol.push(name);

    return res.json(futebol);
});

// Atualizar um time
server.put('/futebol/:index', (req, res) => {
    const {index} = req.params;
    const {name} = req.body;

    futebol [index] = name;

    return res.json(futebol);
});

// Deletar um time
server.delete('/futebol/:index', (req, res) => {
    const {index} = req.params;

    futebol.splice(index, 1);
    return res.json({message: "O time foi excluído."});
});


server.listen(3000, () => {
    console.log('Servidor rodando')
});

