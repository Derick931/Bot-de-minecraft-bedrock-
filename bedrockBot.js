const bedrock = require('bedrock-protocol');
const http = require('http');

const SERVER_HOST = 'olivia.hidencloud.com';
const SERVER_PORT = 24707;
const USERNAME = 'bot_user';
const VERSION = '1.21.93'; // Usa la versión real del server

let client;
let pingInterval = null;
let moveInterval = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 10;

let position = { x: 0, y: 0, z: 0 }; // Posición actual del bot

function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

function connectBot() {
  log('🟡 Intentando conectar el bot...');

  client = bedrock.createClient({
    host: SERVER_HOST,
    port: SERVER_PORT,
    username: USERNAME,
    version: VERSION,
  });

  client.once('spawn', () => {
    log('✅ ¡Bot conectado y spawneado en el servidor!');
    reconnectAttempts = 0;

    // Guardar posición inicial del bot
    position = client.entity.position;

    // Limpia intervals anteriores
    if (pingInterval) clearInterval(pingInterval);
    if (moveInterval) clearInterval(moveInterval);

    // Mantener conexión con ping
    pingInterval = setInterval(() => {
      if (client && client.session && client.session.connected) {
        client.ping()
          .then(() => log('🔄 Ping enviado para mantener conexión'))
          .catch(err => log(`⚠️ Error en ping: ${err}`));
      }
    }, 15000);

    // Comenzar a caminar hacia adelante
    startWalking();
  });

  client.on('disconnect', (reason) => {
    log(`❌ Bot desconectado: ${reason}`);
    if (pingInterval) clearInterval(pingInterval);
    if (moveInterval) clearInterval(moveInterval);

    reconnectAttempts++;
    if (reconnectAttempts > MAX_RECONNECT_ATTEMPTS) {
      log('🚫 Demasiados intentos de reconexión. Esperando 60 segundos...');
      setTimeout(connectBot, 60000);
      reconnectAttempts = 0;
    } else {log(`🔁 Reconectando en 5 segundos... (Intento ${reconnectAttempts})`);
      setTimeout(connectBot, 5000);
    }
  });

  client.on('error', (err) => {
    log(`⚠️ Error: ${err}`);
  });
}

// Función para simular caminar hacia adelante
function startWalking() {
  if (!client || !client.entity || !client.entity.position) {
    log('❗ No se puede mover: entidad no disponible aún.');
    return;
  }

  if (moveInterval) clearInterval(moveInterval);

  log('🚶 Iniciando movimiento hacia adelante...');

  moveInterval = setInterval(() => {
    // Avanza en Z positivo (puedes ajustar según la dirección que desees)
    position.z += 0.3;

    client.queue('player_move', {
      position,
      rotation: { x: 0, y: 0 },
      onGround: true,
      mode: 0,
      teleportCause: 0,
      entityRuntimeId: client.entity.runtime_id
    });

    log(`➡️ Posición actual: x=${position.x.toFixed(2)}, y=${position.y.toFixed(2)}, z=${position.z.toFixed(2)}`);
  }, 500); // Mueve cada 0.5s
}

// Servidor HTTP para mantener vivo el proceso
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('✅ Bot is alive');
}).listen(PORT, () => {
  log(`🌐 Servidor HTTP activo en puerto ${PORT}`);
});

// Iniciar el bot
connectBot();
