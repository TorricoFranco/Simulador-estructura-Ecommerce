import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { cartRouter } from "./router/cart.router.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3003
const SERVICE_NAME = process.env.SERVICE_NAME || "cart"

cartRouter(app)


app.listen(PORT, () => {
  console.log(`Server running on server http:localhost:${PORT}`)
})