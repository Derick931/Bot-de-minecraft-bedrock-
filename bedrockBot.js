const bedrock = require('bedrock-protocol');
const http = require('http');

const SERVER_HOST = 'vicky.hidencloud.com';
const SERVER_PORT = 25526;
const USERNAME = 'bot_user';
const VERSION = '1.21.94'; // Usa la versión exacta del server para evitar errores

let client;
let pingInterval = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 10;

function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

function connectBot() {
  log('Intentando conectar el bot...');

  client = bedrock.createClient({
    host: SERVER_HOST,
    port: SERVER_PORT,
    username: USERNAME,
    version: VERSION,
  });

  client.once('join', () => {
    log('✅ ¡Bot conectado al servidor de Minecraft Bedrock!');
    reconnectAttempts = 0; // Resetea el contador de reconexión

    // Limpia intervalos anteriores
    if (pingInterval) clearInterval(pingInterval);

    // Crea el intervalo de ping
    pingInterval = setInterval(() => {
      if (client && client.session && client.session.connected) {
        client.ping()
          .then(() => log('🔄 Ping enviado para mantener conexión'))
          .catch(err => log(`⚠️ Error en ping: ${err}`));
      }
    }, 15000);
  });

  client.on('disconnect', (reason) => {
    log(`❌ Bot desconectado: ${reason}`);
    if (pingInterval) clearInterval(pingInterval);

    reconnectAttempts++;
    if (reconnectAttempts > MAX_RECONNECT_ATTEMPTS) {
      log(`🚫 Demasiados intentos de reconexión. Esperando 60 segundos antes de reintentar...`);
      setTimeout(connectBot, 60000);
      reconnectAttempts = 0; // Opcional: reinicia el contador
    } else {
      log(`🔁 Reconectando en 5 segundos... (Intento ${reconnectAttempts})`);
      setTimeout(connectBot, 5000);
    }
  });

  client.on('error', (err) => {
    log(`⚠️ Error: ${err}`);
  });
}

// Crear servidor HTTP para UptimeRobot o Render
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bot is alive');
}).listen(PORT, () => {
  log(`🌐 Servidor HTTP activo en puerto ${PORT}`);
});

// Iniciar el bot
connectBot();


});

// Iniciar bot
connectBot();
