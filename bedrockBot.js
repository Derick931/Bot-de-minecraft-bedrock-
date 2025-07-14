const bedrock = require('bedrock-protocol');
const http = require('http');

const SERVER_HOST = 'vicky.hidencloud.com';
const SERVER_PORT = 25526;
const USERNAME = 'bot_user';
const VERSION = '1.21.93';

let client;

function connectBot() {
  client = bedrock.createClient({
    host: SERVER_HOST,
    port: SERVER_PORT,
    username: USERNAME,
    version: VERSION,
  });

  client.on('join', () => {
    console.log('¡Bot conectado al servidor de Minecraft Bedrock!');
  });

  client.on('disconnect', (reason) => {
    console.log('Bot desconectado:', reason);
    // Reconectar tras 5 segundos
    setTimeout(() => {
      console.log('Reconectando...');
      connectBot();
    }, 5000);
  });

  client.on('error', (err) => {
    console.error('Error:', err);
  });

  // Enviar ping cada 15 segundos para evitar timeout
  setInterval(() => {
    if (client && client.session && client.session.connected) {
      client.ping()
        .then(() => console.log('Ping enviado para mantener conexión'))
        .catch(err => console.error('Error en ping:', err));
    }
  }, 15000);
}

// Crear servidor HTTP para UptimeRobot
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bot is alive');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
console.log(`Servidor HTTP activo en puerto ${PORT}`);

});

// Iniciar bot
connectBot();
