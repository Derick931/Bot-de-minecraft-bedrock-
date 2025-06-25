const bedrock = require('bedrock-protocol');
const http = require('http');

const client = bedrock.createClient({
  host: 'Soyuser2908.aternos.me',
  port: 39041,
  username: 'bot_user',
  version: '1.21.90'
});

client.on('join', () => {
  console.log('¡Bot conectado al servidor de Minecraft Bedrock!');
});

client.on('disconnect', (reason) => {
  console.log('Bot desconectado:', reason);
});

client.on('error', (err) => {
  console.error('Error:', err);
});

// Servidor HTTP simple para UptimeRobot
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Bot activo');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
});


client.on('raknet:packet', (packet) => {
  if (packet.name === 'unconnectedPong') {
    const pongTimestamp = Date.now();
    const latency = pongTimestamp - lastPingTimestamp;
    console.log(`Ping recibido. Latencia: ${latency} ms`);
    // Aquí podrías enviar este dato a un webhook o chat si quieres
  }
});

function startPing() {
  pingInterval = setInterval(() => {
    if (client && client.session) {
      lastPingTimestamp = Date.now();
      client.session.sendPacket('unconnectedPing', {
        pingId: lastPingTimestamp,
        magic: Buffer.from('00ffff00fefefefefdfdfdfd12345678', 'hex'),
      });
      console.log('Ping enviado para mantener conexión');
    }
  }, 20000); // cada 20 segundos
}

function stopPing() {
  if (pingInterval) {
    clearInterval(pingInterval);
    pingInterval = null;
  }
}
