const { Client } = require('@prismarinejs/bedrock-protocol')

const client = new Client({
  host: 'Soyuser2908.aternos.me', // IP/host del servidor Bedrock
  port: 39041,                    // Puerto del servidor
  username: 'bot_user',           // Nombre del bot
  version: '1.21.92.1'            // Versión exacta del protocolo (asegúrate que coincida)
})

client.on('spawn', () => {
  console.log('¡Bot conectado con éxito a Bedrock!');
  // Envía un mensaje de chat al aparecer
  client.queue('text', {
    type: 'chat',
    needs_translation: false,
    source_name: client.options.username,
    message: '¡Hola! Soy un bot 😎',
    xuid: '',
    platform_chat_id: '',
  })
})

// Evento para mostrar mensajes de chat recibidos
client.on('text', (packet) => {
  console.log(`[CHAT] ${packet.source_name}: ${packet.message}`)
})
