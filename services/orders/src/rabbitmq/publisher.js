import { getChannel } from "./connect.js"
import { ROUTING_KEYS } from "./routing.keys.js"

const exchangeName = process.env.EXCHANGE || "events"


const publishEvent = async (routingKey, data) => {
  const channel = getChannel()
  channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(data)))
  console.log(`📤 Evento '${routingKey}'`)
}

// 🔹 Publishers 
export const publishOrderPaid = async (orderData) => {
  publishEvent(ROUTING_KEYS.ORDER_PAID, orderData)
}
export const publishOrderPaymentsFailed = async (orderData) => {  
  publishEvent(ROUTING_KEYS.ORDER_PAYMENT_FAILED, orderData)
}
export const publishOrderCompleted = async (orderData) => {
  publishEvent(ROUTING_KEYS.ORDER_COMPLETED, orderData)
}
export const publishOrderFailed = async (orderData) => { 
  publishEvent(ROUTING_KEYS.ORDER_FAILED, orderData)
}
