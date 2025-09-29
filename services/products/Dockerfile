FROM node:18-alpine

WORKDIR /usr/src/service/products

COPY package*.json ./

RUN npm install 

EXPOSE 3006

COPY . .

CMD ["npm", "run", "start"]
