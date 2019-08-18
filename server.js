const express     = require('express');
const bodyParser  = require("body-parser");
const speakeasy   = require("speakeasy");   //https://www.npmjs.com/package/speakeasy
const server      = express();

server.use(bodyParser.json());

server.set('port', process.env.PORT || 3000);

server.get('/', (request, response) => {
    response.send('Eth2FA Homepage!');
});

// test endpoint
server.get('/eth2fa', (request, response) => {
    response.send('eth2fa get request!');
});

// OTP secret setup
server.post('/setup', (request, response) => {
  let key = speakeasy.generateSecret({
    length: 20
  });
  response.send({
    "secret": key.base32
  })
})

// code to generate the OTP token (for testing purposes)
server.post('/generate', (request, response) => {
  response.send({
    "totp": speakeasy.totp({
      secret: request.body.secret,
      encoding: "base32"
    }),
    "time": new Date().getTime()
  })
})

// check token against secret
// For hackathon purposes secret is passed in as a parameter
// - Ideally we should have a DB with the secret saved mapped to user
server.post('/solve', (request, response) => {
  response.send({
    "result" : speakeasy.totp.verify({
      secret: request.body.secret,
      token: request.body.token,
      encoding: "base32"
    })
  })
})

// server
server.listen(3000, () => { console.log('Eth2FA server created at port 3000') });
