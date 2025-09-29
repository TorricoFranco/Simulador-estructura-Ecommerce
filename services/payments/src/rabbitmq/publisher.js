import { getChannel } from "./connect.js"
import { ROUTING_KEYS } from "./routing.keys.js"

const exchangeName = process.env.EXCHANGE || "events"


const publishEvent = async (routingKey, data) => {
  const channel = getChannel()
  channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(data)))
  console.log(`📤 Evento '${routingKey}' enviado:`, data)
}

// Publishers 
export const publishPaymentsSucceeded = async (orderData) =>
  publishEvent(ROUTING_KEYS.PAYMENT_SUCCEEDED, orderData)

export const publishPaymentsFailed = async (orderData) =>
  publishEvent(ROUTING_KEYS.PAYMENT_FAILED, orderData)

