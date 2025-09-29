SERVICE_NAME=$1
PORT=$2
# package.json vacío


cd services

mkdir $SERVICE_NAME

cd $SERVICE_NAME

npm init -y > /dev/null

npm install express cors dotenv amqplib > /dev/null

cat <<EOL > .env
PORT=$PORT
SERVICE_NAME=$SERVICE_NAME
CONNECTION_RABBITMQ=amqp://123:123@rabbitmq:5672

EOL

mkdir -p src

mkdir -p src/{controller,models,router,services,utils,rabbitmq}


cat <<EOL > src/index.js
import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || $PORT
const SERVICE_NAME = process.env.SERVICE_NAME || "$SERVICE_NAME"


