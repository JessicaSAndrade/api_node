/* StatusCode:
 200: tudo OK
 201: criado
 400: sua requisição tem algum problema
 404: o conteúdo que você pediu não foi encontrado
 500: deu um problema no nosso servidor
 503: serviço inoperante */

// Instância do modulo do mongoose para conexão com o banco de dados
const mongoose = require('mongoose');
// Instância do model, objeto com o schema necessário para criar a inserção dos dados
const Mentions = mongoose.model('Mentions');

// Import do repository
const repository = require('../repositories/mentions-repository');

// Método para listar todos os dados do banco, sendo este método uma função assícrona
// Aguardando um await de dados, este await ´pe o find, que busca todos os dados
// Este dado será armazenado no data, e será devolvido pelo express dando ao usuário o status 200
// Ou o status 300 caso haja uma falha
exports.listMentions = async(req, res) => {
    try {
        // Modo com todos os valores do banco
        // const data = await Mentions.find({});
        // Método com todos os valores filtrando apenas pelo necessário
        // const data = await Mentions.find({}, 'friend mention');
        // Método que define que quer apenas o friend e a mention, removendo o id com o -
        // Modificações nas chamadas dos dados
        const data = await repository.listMentions();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao carregar as menções!' });
    }
}

// Método para criação de dados no banco de dados, também é uma função assíncrona, que só ocorre quando os dados
// São efetivamente inseridos, caso não haja a inserção, ele irá retornar o status 500, e caso haja sucesso, ele retorna o status 201
exports.createMention = async(req, res) => {
    console.log(req);
    // Try para tentar coneção
    try {
        // Modificações nas chamadas dos dados
        await repository.createMention({
            friend: req.body.friend,
            mention: req.body.mention
        });

        // Imprime o objeto menção com os valores do body
        console.log(mention)

        // Aguarda o salvamento da menção criada, foi movido para o repository
        // await mention.save();
        // Retorno de status 201 caso for sucesso
        res.status(201).send({ message: 'Menção cadastrada com sucesso!' });
    } catch (e) {
        // Retorno do status 500 caso for falha
        res.status(500).send({ message: 'Falha ao cadastrar a menção.' });
    }
};