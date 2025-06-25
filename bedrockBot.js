require('./keep_alive.js');

const bedrock = require('bedrock-protocol');

const client = bedrock.createClient({
  host: 'Soyuser2908.aternos.me', // Cambia si el IP o puerto cambia
  port: 39041,
  username: 'bot_user',
  version: '1.21.90'
});

client.on('join', () => {
  console.log('✅ Bot conectado al servidor');
});

client.on('spawn', () => {
  console.log('🚶 Bot va a caminar...');

  let x = 0;
  let y = 100;
  let z = 0;

  // Movimiento en bucle cada 1 segundo
  setInterval(() => {
    x += 0.3; // Cambia dirección o velocidad si quieres
    client.write('move_player', {
      runtime_id: client.entityId,
      position: { x, y, z },
      rotation: { x: 0, y: 0 },
      mode: 0, // NORMAL
      on_ground: true,
      ridden_runtime_id: 0,
      teleport: false,
      tick: 0
    });
  }, 1000);
});

client.on('disconnect', (reason) => {
  console.log('❌ Bot desconectado:', reason);
});

client.on('error', (err) => {
  console.error('⚠️ Error:', err);
});
