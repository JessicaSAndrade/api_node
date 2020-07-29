// Chamada do express
const express = require('express');
// Chamada da conexão com o atlas, utilizando o mongoose e o dotenv para 
// Criar conexão direto com o Atlas
const mongoose = require('mongoose');
require('dotenv').config();

// Instancia do express
// App
const app = express();

// Database
// Conexão com o banco de dados (tratamento), chamando o token de conexão que foi
// Criado anteriormente no arquivo de env
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true
});


// Chama a instancia do mongoose para validar os eventos de conexão, erro e disconexão
const db = mongoose.connection;

// Se conexão...
db.on('connected', () => {
    // A conexão foi aberta
    console.log('Mongoose default connection is open')
});


// Tratamento de erros de conexão...
db.on('error', err => {
    // A conexão retornou erro
    console.log(`Mongoose default connection has occured \n${err}`);
})

// Conexão fechada
db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

// mantem a conexão e fecha a conexão caso a aplicação seja fechada
// Ou seja, caso o processo do note sofra um kill (morra)

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
            'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});

// Chamada do modulo de banco de dados
const Mentions = require('./models/mentions');

// Carregamento de rotas padrão, chamando do arquivo de rotas index-routes.js
const indexRoutes = require('./routes/index-routes');
// fixamento da porta inicial como /
app.use('/', indexRoutes);

// Rotas de menções
const mentionsRoutes = require('./routes/mentions-routes');
// Chamada de rotas de menções
app.use('/mentions', mentionsRoutes);


module.exports = app;