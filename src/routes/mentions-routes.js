// Import do express para utilizar a framework
const express = require('express');
// Import do componente de rotas
const router = express.Router();
// Import do módulo controler
const mentionsController = require('../controllers/mentions-controller');

// Definição das rotas get para retornar toda a lista,
// E post para retornar o insert de dados
router.get('/', mentionsController.listMentions);
router.post('/', mentionsController.createMention);
// Export do módulo de rotas
module.exports = router;