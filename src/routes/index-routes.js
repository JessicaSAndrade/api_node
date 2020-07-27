const express = require('express');
const router = express.Router();


// Criação do fluxo de rotas, ao chamar a requisição a partir da rota /,
//  o status code 200 retornada a menção e versão da api
router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'ApiNodeTcc',
        VERSION: '1.0.0'
    });
});

module.exports = router;