import express from "express"
import dotenv from "dotenv"
import { authRouter } from "./router/auth.router.js"
import { connectRabbitMQ } from "./rabbitmq/connect.js"
import { retryConnection } from "./utils/retry.js"

const app = express()

const PORT = process.env.PORT
const SERVICE_NAME = process.env.SERVICE_NAME
const ENVIROMENT = process.env.NODE_ENV

dotenv.config()
app.use(express.json())


async function initConnections() {
  await retryConnection(connectRabbitMQ, 20, 3000); 
  console.log("✅ RabbitMQ listo para publicar eventos");
}

authRouter(app)

app.listen(PORT, async () => {
  console.log(`Server running on server http:${SERVICE_NAME}:${PORT} en modo en modo: ${ENVIROMENT}`) 
  await initConnections()
})
