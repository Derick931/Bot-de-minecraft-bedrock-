const bedrock = require('bedrock-protocol');
const http = require('http');
const { Configuration, OpenAIApi } = require('openai');

// --- CONFIGURACIÓN ---
const SERVER_HOST = 'Soyuser2908.aternos.me';
const SERVER_PORT = 39041;
const USERNAME = 'bot_user';
const VERSION = '1.21.90';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'TU_API_KEY_AQUI'; // ¡Pon tu clave en variable entorno!

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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

  client.on('text', async (packet) => {
    const message = packet.message;
    if (!message || typeof message !== 'string') return;
    if (message.includes(USERNAME)) return; // No responder a sí mismo

    console.log(`Mensaje recibido: ${message}`);

    try {
      // Petición a OpenAI para respuesta corta (máx 24 tokens)
      const response = await openai.createChatCompletion({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Eres un bot de Minecraft que responde con frases cortas y naturales.' },
          { role: 'user', content: message },
        ],
        max_tokens: 24,
      });

      const reply = response.data.choices[0].message.content.trim();
      console.log(`Respuesta GPT: ${reply}`);

      client.write('text', { message: reply });
    } catch (error) {
      console.error('Error con OpenAI:', error);
    }
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

  setInterval(() => {
    if (client && client.session && client.session.connected) {
      client.ping()
        .then(() => console.log('Ping enviado para mantener conexión'))
        .catch(err => console.error('Error en ping:', err));
    }
  }, 15000);
}

// Servidor HTTP para UptimeRobot
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bot is alive');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor HTTP activo en puerto ${PORT}`);
});

connectBot();

