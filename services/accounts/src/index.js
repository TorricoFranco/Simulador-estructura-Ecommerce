import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { accountsRouter } from "./router/accounts.router.js"
import { retryConnection } from "./utils/retry.js"

import { connectRabbitMQ } from "./rabbitmq/connect.js"
import { startSubscriber } from "./rabbitmq/suscriber.js"
import { userHandlers } from "./rabbitmq/handle/userHandle.js"

dotenv.config()

const PORT = process.env.PORT || 3008
const SERVICE_NAME = process.env.SERVICE_NAME || "accounts"

const app = express()
app.use(cors())
app.use(express.json())


accountsRouter(app)

app.listen(PORT, async () => {
  console.log(`Server running on server http:${SERVICE_NAME}:${PORT}`) 
  await retryConnection(connectRabbitMQ, 20, 3000)

  startSubscriber(userHandlers, {
    queue: "accounts_user_queue",
    pattern: "user.*",
  })

  console.log("✅ Conexiones a RabbitMQ inicializadas")

})





