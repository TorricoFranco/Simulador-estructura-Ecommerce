import { getChannel } from "./connect.js"
import dotenv from "dotenv"

dotenv.config()

const exchangeName = process.env.EXCHANGE || "events"
const pattern = process.env.PATTERN || "user.created"
const queue = process.env.QUEUE || "acounts_queue"

export const startSubscriber = async (handlers) => {
  const channel = getChannel()

  await channel.assertQueue(queue, { durable: true })
  await channel.bindQueue(queue, exchangeName, pattern)

  console.log(`📥 Subscriber escuchando eventos con patrón: '${pattern}'`)

  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const routingKey = msg.fields.routingKey
      const event = JSON.parse(msg.content.toString())

      console.log(`📩 Evento recibido [${routingKey}]:`, event)

      if (handlers[routingKey]) {
        handlers[routingKey](event)
      } else {
        console.warn(`⚠️ No hay handler para '${routingKey}'`)
      }

      channel.ack(msg)
    }
  })
}
