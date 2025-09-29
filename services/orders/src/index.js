import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { retryConnection } from "./utils/retry.js"

import { ordersRouter } from "./router/orders.router.js"
import { connectRabbitMQ } from "./rabbitmq/connect.js"

dotenv.config()

const PORT = process.env.PORT || 3005
const SERVICE_NAME = process.env.SERVICE_NAME || "orders"

const app = express()
app.use(cors())
app.use(express.json())


async function initConnections() {
  await retryConnection(connectRabbitMQ, 20, 3000); 
  console.log("✅ RabbitMQ listo para publicar eventos");
}

ordersRouter(app)

app.listen(PORT, async () => {
  console.log(`Server running on server http:${SERVICE_NAME}:${PORT}`) 

  await initConnections()
})
