import express from 'express'
import cors from 'cors'
import { routerIndex } from './router/index.router.js'
import dotenv from 'dotenv'

// dotenv.config()

const PORT = process.env.PORT || 3000
const SERVICE_NAME = process.env.SERVICE_NAME || "API GATEWAY"

const app = express()
app.use(cors())

    
app.use(express.json())

routerIndex(app)

app.listen(PORT, () => {
  console.log(`Server running on server http:${SERVICE_NAME}:${PORT}`) 

})


