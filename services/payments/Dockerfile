FROM node:18-alpine

WORKDIR /usr/src/service/payments

COPY package*.json ./

RUN npm install 

EXPOSE 3009

COPY . .

CMD ["npm", "run", "start"]
