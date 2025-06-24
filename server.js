const { createClient } = require('bedrock-protocol');

const client = createClient({
  host: 'Soyuser2908.aternos.me',
  port: 39041,
  username: 'bot_user',
  version: '1.21.92.1'
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
  }, 100)
