// Chama as dependencias necessárias para a conexão e para o debug
const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');

// PORT //based on express-generator
// Função para normalizar a porta, de modo que o express escolhe qualquer porta
// sendo esta porta uma disponível, e esperada a porta 3000

function normalizePort(val) {

    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false

}

// Normaliza a porta
const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

// Valida caso haja erro, e trata esse spossíveis erros
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe' + port : 'Port' + port;

    switch (error.code) {
        case 'EACCES':
            console.log(bind + 'requires elevated privileges');
            process.exit(1);

        case 'EADDRINUSE':
            console.log(bind + 'is already in use');
            process.exit(1);

        default:
            throw error;
    }
}

// Nesta função o servidor foi criado como ouvinte, quase como um Daemon, para se manter ouvinte e ficar de pé.
// Listener Handler
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe' + addr : 'port' + addr.port;
    debug('Listening on ' + bind);
}

// Server = Implementação de acesso ao servidor, valida a porta e faz a conexão
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
// Porta real da api, ou seja, aqui será exibida a exata porta onde o servidor esta executando
console.log(`API esta de pé na porta: ${port}`)