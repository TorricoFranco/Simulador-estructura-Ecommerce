import express from "express"
import dotenv from "dotenv"
import { authRouter } from "./router/auth.router.js"
import { connectRabbitMQ } from "./rabbitmq/connect.js"
import { retryConnection } from "./utils/retry.js"

const app = express()

dotenv.config()
app.use(express.json())

const PORT = process.env.PORT || 3002
const SERVICE_NAME = process.env.SERVICE_NAME || "auth"

async function initConnections() {
  await retryConnection(connectRabbitMQ, 20, 3000); 
  console.log("✅ RabbitMQ listo para publicar eventos");
}

authRouter(app)

app.listen(PORT, async () => {
  console.log(`✅ ${SERVICE_NAME} service escuchando en puerto ${PORT}`)
  await initConnections()
})
