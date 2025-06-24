const { createClient } = require('bedrock-protocol');

const client = createClient({
  host: 'Soyuser2908.aternos.me',
  port: 39041,
  username: 'BotCaminante'
});

client.on('spawn', () => {
  console.log('¡Bot conectado y listo para caminar!');

  setInterval(() => {
    client.queue('player_auth_input', {
      pitch: 0,
      yaw: 0,
      position: client.entity.position,
      move_vector: { x: 0, z: 1 },
      head_yaw: 0,
      input_data: 0x8000000,
      input_mode: 0,
      play_mode: 0
    });
  }, 100);
});
