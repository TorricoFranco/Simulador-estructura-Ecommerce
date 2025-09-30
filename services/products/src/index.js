import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { retryConnection } from "./utils/retry.js"

import { productRouter } from "./router/products.router.js"
import { connectRabbitMQ } from "./rabbitmq/connect.js"


dotenv.config()

const PORT = process.env.PORT
const SERVICE_NAME = process.env.SERVICE_NAME
const ENVIROMENT = process.env.NODE_ENV

const app = express()
app.use(cors())
app.use(express.json())


productRouter(app)

async function initConnections() {
  await retryConnection(connectRabbitMQ, 20, 3000); 
  console.log("✅ RabbitMQ listo para publicar eventos");
}

app.listen(PORT, async () => {
  console.log(`Server running on server http:${SERVICE_NAME}:${PORT} en modo en modo: ${ENVIROMENT}`) 
  await initConnections()
})



