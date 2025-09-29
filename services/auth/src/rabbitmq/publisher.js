import { getChannel } from "./connect.js"
import { ROUTING_KEYS } from "./routing.keys.js"

const exchangeName = process.env.EXCHANGE || "events"

// 🔹 Función genérica para publicar cualquier evento
const publishEvent = async (routingKey, data) => {
  const channel = getChannel()
  channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(data)))
  console.log(`📤 Evento '${routingKey}' enviado:`, data)
}

// 🔹 Publishers específicos
export const publishUserCreated = async (userData) =>
  publishEvent(ROUTING_KEYS.USER_CREATED, userData)

export const publishUserLogin = async (userData) =>
  publishEvent(ROUTING_KEYS.USER_LOGIN, userData)

export const publishUserLogout = async (userData) =>
  publishEvent(ROUTING_KEYS.USER_LOGOUT, userData)

export const publishUserRefresh = async (userData) =>
  publishEvent(ROUTING_KEYS.USER_REFRESH, userData)

