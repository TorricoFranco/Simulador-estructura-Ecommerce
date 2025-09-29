import { getChannel } from "./connect.js"
import { ROUTING_KEYS } from "./routing.keys.js"

const exchangeName = process.env.EXCHANGE || "events"


const publishEvent = async (routingKey, data) => {
  const channel = getChannel()
  channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(data)))
  console.log(`📤 Evento '${routingKey}'`)
}

// 🔹 Publishers 
export const publishCreateShipping = async (shippingData) => {
  publishEvent(ROUTING_KEYS.SHIPPING_CREATE, shippingData)
}

export const publishShippingUpdateStatus = async (shippingData) => {
  publishEvent(ROUTING_KEYS.SHIPPING_UPDATE, shippingData)
}
