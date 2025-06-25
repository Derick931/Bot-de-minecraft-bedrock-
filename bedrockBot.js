const bedrock = require('bedrock-protocol');

process.on('uncaughtException', (err) => {
  console.error('⛔️ Error no capturado:', err);
});

function startBot() {
  const client = bedrock.createClient({
    host: 'Soyuser2908.aternos.me',
    port: 39041,
    username: 'bot_user',
    version: '1.21.90',
    authTitle: 'minecraft',
    offline: false
  });

  client.on('join', () => {
    console.log('✅ ¡Bot conectado al servidor de Minecraft Bedrock!');

    // Movimiento hacia adelante infinito
    setInterval(() => {
      if (!client.state?.position) return;

      client.queue('player_auth_input', {
        pitch: 0,
        yaw: 0,
        position: client.state.position,
        move_vector: { x: 0, y: 0, z: 1 },
        head_yaw: 0,
        input_data: 0x00000001,
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
    }, 100); // cada 100ms

    // Enviar mensaje de actividad cada 60 segundos
    setInterval(() => {
      client.queue('text', {
        type: 'chat',
        needs_translation: false,
        source_name: client.username,
        message: 'Estoy activo!',
        xuid: '',
        platform_chat_id: ''
      });
    }, 60000);
  });

  client.on('disconnect', (reason) => {
    console.log('❌ Bot desconectado:', reason);
    // Reiniciar bot después de 5 segundos
    setTimeout(() => {
      console.log('🔁 Reiniciando bot...');
      startBot();
    }, 5000);
  });

  client.on('error', (err) => {
    console.error('⚠️ Error:', err);
  });
}

startBot(); // Ejecutar bot al inicio
