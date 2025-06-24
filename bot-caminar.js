const { createClient } = require('bedrock-protocol');

const client = createClient({
  host: 'Soyuser2908.aternos.me',   // Cambia por la IP o dominio del servidor Bedrock
  port: 39041,           // Puerto del servidor (default 19132)
  username: 'bot_user',    // Nombre del bot
  version: '1.21.92.1'   // ¡Versión más reciente!
});

client.on('join', () => {
  console.log('¡Bot conectado al servidor de Minecraft Bedrock!');
  // Aquí puedes poner tu código de caminar
});
client.on('disconnect', (reason) => {
  console.log('Bot desconectado:', reason);
});
client.on('error', (err) => {
  console.error('Error:', err);
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
  // Mantener presionada la tecla "adelante" (W) en Minecraft Bedrock es equivalente a enviar un movimiento hacia adelante.
  // Esto se logra enviando el paquete 'player_auth_input' repetidamente.
  setInterval(() => {
    client.queue('player_auth_input', {
      pitch: 0,
      yaw: 0,
      position: client.entity.position,
      moveVector: { x: 0, y: 0, z: 1 }, // Z positivo es adelante en Bedrock
      headYaw: 0,
      inputData: 0x00000020, // PRESSED_FORWARD
      inputMode: 0, // 0 = Mouse/Keyboard
      playMode: 1, // 1 = Survival
      tick: client.tick ?? 0
    });
  }, 100); // Cada 100ms
