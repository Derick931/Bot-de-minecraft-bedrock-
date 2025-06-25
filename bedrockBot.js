const bedrock = require('bedrock-protocol');

let reconnectTimeout;
let afkInterval;

const client = bedrock.createClient({
  host: 'Soyuser2908.aternos.me',
  port: 39041,
  username: 'bot_user',
  version: '1.21.90'
});

client.on('join', () => {
  console.log('¡Bot conectado al servidor de Minecraft Bedrock!');

  // Movimiento simple para evitar AFK
  afkInterval = setInterval(() => {
    client.write('move_player', {
      pitch: Math.sin(Date.now() / 1000) * 10,
      yaw: 0,
      position: client.position,
      onGround: true
    });
  }, 15000);
});

client.on('chat', (packet) => {
  const message = packet.message.toLowerCase();
  if (message.includes('salte bot')) {
    console.log('Comando recibido: desconectando bot...');
    clearInterval(afkInterval);
    client.disconnect('Comando de salida recibido');
    process.exit(0); // Opcional para cerrar el proceso
  }
});

client.on('disconnect', (reason) => {
  console.log('Bot desconectado:', reason);
  clearInterval(afkInterval);

  // Reconectar después de 5 segundos
  reconnectTimeout = setTimeout(() => {
    console.log('Reconectando bot...');
    // Como el cliente original es constante, aquí tendrías que reiniciar el proceso o implementar reconexión
    process.exit(1); // Este es un método simple para reiniciar si usas PM2 o similar
  }, 5000);
});

client.on('error', (err) => {
  console.error('Error:', err);
});
