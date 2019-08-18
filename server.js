const express     = require('express');
const bodyParser  = require("body-parser");
const speakeasy   = require("speakeasy");
const server      = express();

server.use(bodyParser.json());

server.set('port', process.env.PORT || 3000);

server.get('/', (request, response) => {
    response.send('Hello');
});

server.get('/eth2fa', (request, response) => {
    response.send('eth2fa app!');
});

server.post('/payload', (request, response) => {
    console.log(request);
    response.send(request.body);
});


server.listen(3000, () => { console.log('Node server created at port 3000') });
