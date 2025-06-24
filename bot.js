const bedrock = require('bedrock-protocol');

function startBot(username, host, port) {
  const client = bedrock.createClient({
    host,
    port,
    username,
    version: '1.21.91' // ajusta si es necesario
  });

  client.on('join', () => {
    console.log(`[BOT] ${username} se unió a ${host}:${port}`);
  });

  client.on('disconnect', () => {
    console.log(`[BOT] ${username} fue desconectado`);
  });

  client.on('error', (err) => {
    console.error(`[ERROR] ${username}:`, err.message);
  });
}

module.exports = { startBot };
