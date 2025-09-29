FROM node:18-alpine

WORKDIR /usr/src/service/emails

COPY package*.json ./

RUN npm install 

EXPOSE 3004

COPY . .

CMD ["npm", "run", "start"]
