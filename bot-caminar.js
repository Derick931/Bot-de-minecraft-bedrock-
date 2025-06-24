// Bot para Minecraft Bedrock que se conecta y camina automáticamente
// 1. Ejecuta: npm install
// 2. Ejecuta: npm start

const bedrock = require('bedrock-protocol');

const client = bedrock.createClient({
  host: 'Soyuser2908.aternos.me', // Cambia por la IP/host de tu servidor Bedrock
  port: 39041,                    // Puerto de tu servidor
  username: 'bot_user',           // Cambia el nombre si lo deseas
  version: '1.21.90'              // Cambia por la versión exacta de tu servidor
});

client.on('join', () => {
  console.log('¡Bot conectado al servidor de Minecraft Bedrock!');
  caminarAdelante();
});

client.on('disconnect', (reason) => {
  console.log('Bot desconectado:', reason);
});

client.on('error', (err) => {
  console.error('Error:', err);
});

// Hace que el bot camine hacia adelante continuamente
function caminarAdelante() {
  setInterval(() => {
    client.queue('player_auth_input', {
      pitch: 0,
      yaw: 0,
      position: client.entity.position,
      moveVector: { x: 0, y: 0, z: 1 },
      headYaw: 0,
      inputData: 0x00000020,
      inputMode: 0,
      playMode: 1,
      tick: client.tick ?? 0
    });
  }, 100);
}
