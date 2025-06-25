const bedrock = require('bedrock-protocol');

const client = bedrock.createClient({
  host: 'Soyuser2908.aternos.me',
  port: 39041,
  username: 'bot_user',
  version: '1.21.90'
});

let currentPosition = { x: 0, y: 0, z: 0 }; // Posición inicial

client.on('join', () => {
  console.log('¡Bot conectado al servidor de Minecraft Bedrock!');

  // Cada 15 segundos mueve ligeramente el bot para evitar desconexión por AFK
  setInterval(() => {
    client.write('move_player', {
      pitch: 0,
      yaw: 0,
      position: {
        x: currentPosition.x + 0.1, // mueve un poco en X
        y: currentPosition.y,
        z: currentPosition.z
      },
      onGround: true
    });
  }, 15000);
});

// Actualiza la posición cuando el servidor envía un movimiento
client.on('move_player', (packet) => {
  currentPosition = packet.position;
});

client.on('disconnect', (reason) => {
  console.log('Bot desconectado:', reason);
});

client.on('error', (err) => {
  console.error('Error:', err);
});

