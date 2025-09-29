FROM node:18-alpine

WORKDIR /usr/src/service/auth

COPY package*.json ./

RUN npm install 

EXPOSE 3002

COPY . .

CMD ["npm", "run", "start"]
