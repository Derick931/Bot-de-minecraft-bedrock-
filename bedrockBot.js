const bedrock = require('bedrock-protocol');

console.log('Conectando al servidor...');

const client = bedrock.createClient({
  host: 'Soyuser2908.aternos.me',
  port: 39041,
  username: 'bot_user',
  authTitle: 'minecraft',
  offline: false,
});

client.on('join', () => {
  console.log('✅ ¡Bot conectado al servidor de Minecraft Bedrock!');

  // Movimiento infinito cada 100 ms
  setInterval(() => {
    client.queue('player_auth_input', {
      pitch: 0,
      yaw: 0,
      position: client.state.position,
      move_vector: { x: 0, y: 0, z: 1 }, // hacia adelante
      head_yaw: 0,
      input_data: 0x00000001, // ID para "caminar hacia adelante"
      input_mode: 1,
      play_mode: 1,
      interaction_model: 0,
      tick: BigInt(Date.now()),
      delta: { x: 0, y: 0, z: 0 },
      transaction_data: {
        transaction_type: 0,
        action_type: 0,
        block_position: { x: 0, y: 0, z: 0 },
        face: 0,
        hotbar_slot: 0,
        held_item: { network_id: 0 },
        player_pos: client.state.position,
        click_pos: { x: 0, y: 0, z: 0 },
        block_runtime_id: 0
      },
      item_stack_request: null,
      block_action: null,
      analogue_move_vector: { x: 0, y: 0, z: 0 },
      client_input_sys_version: 0
    });
  }, 100);
});


client.on('error', (err) => {
  console.error('⚠️ Error de conexión:', err);
});
