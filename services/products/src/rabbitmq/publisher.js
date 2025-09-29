import { ROUTING_KEYS } from "./routing.keys.js"
import { getChannel } from "./connect.js"

const exchangeName = process.env.EXCHANGE || "events"

// 🔹 Función genérica para publicar cualquier evento
const publishEvent = async (routingKey, data) => {
  const channel = getChannel()
  channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(data)))
  console.log(`📤 Evento '${routingKey}' enviado:`, data)
}

export const publishProductViewed = async (data) => {
    publishEvent(ROUTING_KEYS.PRODUCT_VIEWED, data)
}