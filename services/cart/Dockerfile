FROM node:18-alpine

WORKDIR /usr/src/service/cart

COPY package*.json ./

RUN npm install 

EXPOSE 3003

COPY . .

CMD ["npm", "run", "start"]
