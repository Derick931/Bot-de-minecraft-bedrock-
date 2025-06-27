const bedrock = require('bedrock-protocol');
const http = require('http');
const OpenAI = require('openai');
require('dotenv').config();

const SERVER_HOST = 'Soyuser2908.aternos.me';
const SERVER_PORT = 39041;
const USERNAME = 'bot_user';
const VERSION = '1.21.90';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let client;

function connectBot() {
  client = bedrock.createClient({
    host: SERVER_HOST,
    port: SERVER_PORT,
    username: USERNAME,
    version: VERSION,
  });

  client.on('join', () => {
    console.log('¡Bot conectado al servidor de Minecraft Bedrock!');
  });

  client.on('disconnect', (reason) => {
    console.log('Bot desconectado:', reason);
    setTimeout(() => {
      console.log('Reconectando...');
      connectBot();
    }, 5000);
  });

  client.on('error', (err) => {
    console.error('Error:', err);
  });

  // Responder con ChatGPT
  client.on('text', async (packet) => {
    const msg = packet.message;
    if (!msg || typeof msg !== 'string') return;
    if (msg.includes(USERNAME)) return;

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o', // o 'gpt-3.5-turbo'
        messages: [
          { role: 'system', content: 'Eres un bot de Minecraft que responde con frases cortas y naturales.' },
          { role: 'user', content: msg },
        ],
        max_tokens: 24,
      });

      const reply = response.choices[0].message.content.trim();
      client.write('text', { message: reply });
    } catch (err) {
      console.error('Error al usar OpenAI:', err.message);
    }
  });

  // Ping para mantener conexión
  setInterval(() => {
    if (client?.session?.connected) {
      client.ping()
        .then(() => console.log('Ping enviado'))
        .catch(err => console.error('Error en ping:', err));
    }
  }, 15000);
}

// Servidor HTTP (para UptimeRobot u otros)
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bot is alive');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor HTTP activo en puerto ${PORT}`);
});

// Iniciar bot
connectBot();

connectBot();

