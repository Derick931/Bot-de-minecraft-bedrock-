// Bot para Minecraft Bedrock que se conecta y camina automáticamente
// Instrucciones:
// 1. Ejecuta: npm install
// 2. Ejecuta: npm start

const { Client } = require('@prismarinejs/bedrock-protocol')

const client = new Client({
  host: 'Soyuser2908.aternos.me', // IP/host del servidor Bedrock
  port: 39041,                    // Puerto del servidor
  username: 'bot_user',           // Nombre del bot (puedes cambiarlo)
  version: '1.21.92.1'            // Versión exacta del protocolo
})

let pos = { x: 0, y: 0, z: 0 }
let pitch = 0, yaw = 0
let entityId = null

client.on('spawn', () => {
  console.log('¡Bot conectado con éxito a Bedrock!')

  entityId = client.runtime_entity_id
  pos = { ...client.spawnPosition }

  // Comienza a moverse después de un segundo
  setTimeout(() => {
    caminarHaciaAdelante()
  }, 1000)
})

client.on('move_player', (packet) => {
  // Actualiza la posición local del bot
  if (packet.runtime_entity_id === entityId) {
    pos.x = packet.position.x
    pos.y = packet.position.y
    pos.z = packet.position.z
  }
})

function caminarHaciaAdelante() {
  // Mueve el bot hacia adelante en el eje X
  pos.x += 1

  client.queue('move_player', {
    runtime_entity_id: entityId,
    position: pos,
    pitch,
    yaw,
    mode: 0, // NORMAL
    on_ground: true,
    ridden_runtime_entity_id: 0,
    teleport_cause: 0,
    teleport_source_entity_type: 0,
    tick: client.tick
  })

  console.log(`Bot caminó a la posición X: ${pos.x}, Y: ${pos.y}, Z: ${pos.z}`)
  // Llama de nuevo para seguir avanzando
  setTimeout(caminarHaciaAdelante, 1000)
}
  console.log(`Bot caminó a la posición X: ${pos.x}, Y: ${pos.y}, Z: ${pos.z}`)
  // Llama de nuevo para seguir avanzando
  setTimeout(caminarHaciaAdelante, 1000)
}
