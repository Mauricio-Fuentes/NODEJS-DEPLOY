'use strict';

const express = require('express');
const { v4: uuidv4 } = require('uuid');

const PORT = 8080;
const HOST = '127.0.0.1';

const app = express();
app.get('/', (_, res) => {
  res.send({
    datos: "It's on DigitalOcean...!",
  });
});

app.get('/delayed', async (_, res) => {
  const SECONDS_DELAY = 60000;

  await new Promise((resolve) => {
    setTimeout(() => resolve(), SECONDS_DELAY);
  });

  res.send({ message: 'delayed response' });
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

app.get('/cliente', (req, res) => {
  const cliente = {
    id: uuidv4(),
    nombre: "Juan Pérez",
    email: "juan.perez@example.com",
    telefono: "+54 11 1234-5678"
  };

  res.send({
    cliente: cliente
  });
});

// Graceful shutdown
function closeGracefully(signal) {
  console.log(`Received signal to terminate: ${signal}`);

  server.close(() => {
    // await db.close() if we have a db connection in this app
    // await other things we should cleanup nicely
    console.log('Http server closed.');
    process.exit(0);
  });
}

process.on('SIGINT', closeGracefully);
process.on('SIGTERM', closeGracefully);
