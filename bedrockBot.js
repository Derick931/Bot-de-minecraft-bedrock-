const bedrock = require('bedrock-protocol');

const client = bedrock.createClient({
  host: 'Soyuser2908.aternos.me',
  port: 39041,
  username: 'bot_user',
  version: '1.21.90'
});

let lastPingTimestamp = 0;
let pingInterval;

client.on('join', () => {
  console.log('¡Bot conectado al servidor de Minecraft Bedrock!');
  startPing();
});

client.on('disconnect', (reason) => {
  console.log('Bot desconectado:', reason);
  stopPing();
  // Puedes agregar reconexión aquí si quieres
});

client.on('error', (err) => {
  console.error('Error:', err);
  stopPing();
  // Puedes agregar reconexión aquí si quieres
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
