import { getChannel } from "./connect.js"
import dotenv from "dotenv"

dotenv.config()

export const startSubscriber = async (handlers, { queue, pattern }) => {
  const channel = getChannel()
  const exchangeName = process.env.EXCHANGE || "events"

  await channel.assertQueue(queue, { durable: true })
  await channel.bindQueue(queue, exchangeName, pattern)

  console.log(`📥 Subscriber escuchando eventos con patrón: '${pattern}', cola: '${queue}'`)

  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const routingKey = msg.fields.routingKey
      const event = JSON.parse(msg.content.toString())
      
      if (handlers[routingKey]) {
        handlers[routingKey](event)
      } else {
        console.warn(`⚠️ No hay handler para '${routingKey}'`)
      }

      channel.ack(msg)
    }
  })
}
