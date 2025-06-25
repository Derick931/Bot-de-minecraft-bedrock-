const bedrock = require('bedrock-protocol');

const client = bedrock.createClient({
  host: 'Soyuser2908.aternos.me',
  port: 39041,
  username: 'bot_user',
  version: '1.21.90'
});

let currentPosition = null; // empieza null

client.on('join', () => {
  console.log('¡Bot conectado al servidor de Minecraft Bedrock!');

  // Solo manda movimiento si currentPosition tiene valor
  setInterval(() => {
    if (currentPosition) {
      client.write('move_player', {
        pitch: 0,
        yaw: 0,
        position: {
          x: currentPosition.x + 0.1, 
          y: currentPosition.y,
          z: currentPosition.z
        },
        onGround: true
      });
      // Actualiza posición para que el movimiento siga
      currentPosition.x += 0.1;
    }
  }, 15000);
});

// Captura posición del servidor para tener datos válidos
client.on('move_player', (packet) => {
  currentPosition = packet.position;
});

client.on('disconnect', (reason) => {
  console.log('Bot desconectado:', reason);
});

client.on('error', (err) => {
  console.error('Error:', err);
});


