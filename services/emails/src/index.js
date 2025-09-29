import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { retryConnection } from "./utils/retry.js"

import { connectRabbitMQ } from "./rabbitmq/connect.js"
import { startSubscriber } from "./rabbitmq/suscriber.js"
import { ordersHandlers } from "./rabbitmq/handle/order.handle.js"
import { shippingHandlers } from "./rabbitmq/handle/shiping.handle.js"

dotenv.config()

const PORT = process.env.PORT || 3004
const SERVICE_NAME = process.env.SERVICE_NAME || "emails"

const app = express()
app.use(cors())
app.use(express.json())


app.listen(PORT, async () => {
  console.log(`Server running on server http:${SERVICE_NAME}:${PORT}`) 
  await retryConnection(connectRabbitMQ, 20, 3000)
  
  // Subscriber de las orders
  startSubscriber(ordersHandlers, {
    queue: "emails_orders_queue",
    pattern: "order.*",
  })

  // Subscriber de los shipping
  startSubscriber(shippingHandlers, {
    queue: "emails_shipping_queue",
    pattern: "shipping.*",
  })

  console.log("✅ Conexiones a RabbitMQ inicializadas")
})

