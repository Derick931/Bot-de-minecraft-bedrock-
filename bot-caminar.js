const bedrock = require('bedrock-protocol')

const client = bedrock.createClient({
  host: 'Soyuser2908.aternos.me', // Tu IP o dominio
  port: 39041,                    // Puerto de tu servidor
  username: 'bot_user',           // Cambia el nombre si lo deseas
  version: '1.21.90'              // Pon exactamente la versión de tu servidor
})

client.on('join', () => {
  console.log('¡Bot conectado al servidor de Minecraft Bedrock!')
})

client.on('disconnect', (reason) => {
  console.log('Bot desconectado:', reason)
})

client.on('error', (err) => {
  console.error('Error:', err)
})
