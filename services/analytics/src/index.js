import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectRabbitMQ } from "./rabbitmq/connect.js"
import { startSubscriber } from "./rabbitmq/suscriber.js"
import { retryConnection } from "./utils/retry.js"
// Handlers
import { userHandlers } from "./rabbitmq/handle/user.handle.js"
import { productHandlers } from "./rabbitmq/handle/product.handle.js"
import { paymentsHandlers } from "./rabbitmq/handle/payments.handle.js"
import { ordersHandlers } from "./rabbitmq/handle/orders.handle.js"
import { shippingHandlers } from "./rabbitmq/handle/shipping.handle.js"

dotenv.config()

const PORT = process.env.PORT
const SERVICE_NAME = process.env.SERVICE_NAME
const ENVIROMENT = process.env.NODE_ENV

const app = express()
app.use(cors())
app.use(express.json())



app.listen(PORT, async () => {
  console.log(`Server running on server http:${SERVICE_NAME}:${PORT} en modo en modo: ${ENVIROMENT}`) 
  await retryConnection(connectRabbitMQ, 20, 3000)
  
   // Subscriber para usuarios
  startSubscriber(userHandlers, {
    queue: "analytics_user_queue",
    pattern: "user.*",
  })

  // Subscriber para productos
  startSubscriber(productHandlers, {
    queue: "analytics_product_queue",
    pattern: "product.*",
  })

  // Subscriber para payments
  startSubscriber(paymentsHandlers, {
    queue: "analytics_payments_queue",
    pattern: "payment.*",
  })

  // Subscriber para orders
  startSubscriber(ordersHandlers, {
    queue: "analytics_orders_queue",
    pattern: "order.*",
  })

  
  // Subscriber para shipping
  startSubscriber(shippingHandlers, {
    queue: "analytics_shipping_queue",
    pattern: "shipping.*",
  })

  console.log("✅ Conexiones a RabbitMQ inicializadas")

})


