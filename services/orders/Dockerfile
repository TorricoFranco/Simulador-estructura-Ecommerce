FROM node:18-alpine

WORKDIR /usr/src/service/orders

COPY package*.json ./

RUN npm install 

EXPOSE 3005

COPY . .

CMD ["npm", "run", "start"]
