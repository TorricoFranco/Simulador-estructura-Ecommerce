import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { shippingRouter } from "./router/shipping.router.js"
import { connectRabbitMQ } from "./rabbitmq/connect.js"
import { startSubscriber } from "./rabbitmq/suscriber.js"
import { ordersHandlers } from "./rabbitmq/handle/orderHandle.js"
import { retryConnection } from "./utils/retry.js"

dotenv.config()

const PORT = process.env.PORT
const SERVICE_NAME = process.env.SERVICE_NAME
const ENVIROMENT = process.env.NODE_ENV


const app = express()
app.use(cors())
app.use(express.json())


shippingRouter(app)

app.listen(PORT, async () => {
  console.log(`Server running on server http:${SERVICE_NAME}:${PORT} en modo en modo: ${ENVIROMENT}`) 
  
  await retryConnection(connectRabbitMQ, 20, 3000)

  // Suscripción a eventos
  startSubscriber(ordersHandlers, {
    queue: "shipping_orders_queue",
    pattern: "order.*",
  })

  console.log("✅ Conexiones a RabbitMQ inicializadas")
})
