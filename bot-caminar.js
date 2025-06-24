const { createClient } = require('bedrock-protocol');

const client = createClient({
  host: 'Soyuser2908.aternos.me', // Cambia por la IP o dominio de tu servidor Bedrock
  port: 39041,                    // Puerto del servidor
  username: 'bot_user',           // Nombre del bot
  version: '1.21.92.1'            // Versión del servidor
});

client.on('join', () => {
  console.log('¡Bot conectado al servidor de Minecraft Bedrock!');

  // Enviar paquete para caminar hacia adelante
  caminarAdelante();
});

client.on('disconnect', (reason) => {
  console.log('Bot desconectado:', reason);
});

client.on('error', (err) => {
  console.error('Error:', err);
});

// Función para caminar hacia adelante
function caminarAdelante() {
  setInterval(() => {
    client.queue('player_auth_input', {
      pitch: 0,
      yaw: 0,
      position: client.entity.position,
      moveVector: { x: 0, y: 0, z: 1 },
      headYaw: 0,
      inputData: 0x00000020, // PRESSED_FORWARD
      inputMode: 0,
      playMode: 1,
      tick: client.tick ?? 0
    });
  }, 100);
}
