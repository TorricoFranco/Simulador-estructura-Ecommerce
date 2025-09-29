FROM node:18-alpine

WORKDIR /usr/src/API_GATEWAY

COPY package*.json ./

RUN npm install 

EXPOSE 3000

COPY . .

CMD ["npm", "run", "start"]
