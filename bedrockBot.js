const bedrock = require('bedrock-protocol');

process.on('uncaughtException', function (err) {
  console.error('⛔️ Error no capturado:', err);
});

console.log('Conectando al servidor...');

const client = bedrock.createClient({
  host: 'Soyuser2908.aternos.me',
  port: 39041,
  username: 'bot_user'
  // version opcional: '1.21.90'
});

client.on('join', () => {
  console.log('✅ ¡Bot conectado al servidor de Minecraft Bedrock!');
  client.setControlState('forward', true);

  // Evita que el proceso termine
  setInterval(() => {}, 1000);
});

client.on('disconnect', (reason) => {
  console.log('❌ Bot desconectado:', reason);
});

client.on('error', (err) => {
  console.error('⚠️ Error de conexión:', err);
});
