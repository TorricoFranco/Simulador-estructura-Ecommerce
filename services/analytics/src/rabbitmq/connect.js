import amqp from "amqplib"
import dotenv from "dotenv"

dotenv.config()

const exchangeName = process.env.EXCHANGE || "events"
const exchangeType = process.env.EXCHANGE_TYPE || "topic"
const connectionString = process.env.CONNECTION_RABBITMQ || "amqp://123:123@rabbitmq:5672"

let channel

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect(connectionString)
  channel = await connection.createChannel()

  await channel.assertExchange(exchangeName, exchangeType, { durable: true })
  console.log(`✅ Conectado a RabbitMQ [exchange: '${exchangeName}']`)

  return channel
}

export const getChannel = () => {
  if (!channel) throw new Error("RabbitMQ no conectado")
  return channel
}
