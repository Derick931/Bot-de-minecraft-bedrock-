const bedrock = require('bedrock-protocol');

const client = bedrock.createClient({
  host: 'Soyuser2908.aternos.me',
  port: 39041,
  username: 'bot_user',
  version: '1.21.90'
});

client.on('join', () => {
  console.log('¡Bot conectado al servidor de Minecraft Bedrock!');
});

client.on('disconnect', (reason) => {
  console.log('Bot desconectado:', reason);
});

client.on('error', (err) => {
  console.error('Error:', err);
});

