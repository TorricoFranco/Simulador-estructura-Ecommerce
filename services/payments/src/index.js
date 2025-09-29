import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { retryConnection } from "./utils/retry.js"
import { paymentsRouter } from "./router/pyments.router.js"

import { connectRabbitMQ } from "./rabbitmq/connect.js"

dotenv.config()

const PORT = process.env.PORT || 3009
const SERVICE_NAME = process.env.SERVICE_NAME || "payments"

const app = express()
app.use(cors())
app.use(express.json())


async function initConnections() {
  await retryConnection(connectRabbitMQ, 20, 3000); 
  console.log("✅ RabbitMQ listo para publicar eventos");
}

paymentsRouter(app)

app.listen(PORT, async () => {
  console.log(`Server running on server http:${SERVICE_NAME}:${PORT}`) 
  
  await initConnections()
})
