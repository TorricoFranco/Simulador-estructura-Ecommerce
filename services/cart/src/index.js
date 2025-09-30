import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { cartRouter } from "./router/cart.router.js"

dotenv.config()

const PORT = process.env.PORT
const SERVICE_NAME = process.env.SERVICE_NAME
const ENVIROMENT = process.env.NODE_ENV

const app = express()
app.use(cors())
app.use(express.json())

cartRouter(app)


app.listen(PORT, () => {
  console.log(`Server running on server http:${SERVICE_NAME}:${PORT} en modo en modo: ${ENVIROMENT}`) 
})