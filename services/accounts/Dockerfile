FROM node:18-alpine

WORKDIR /usr/src/service/accounts

COPY package*.json ./

RUN npm install 

EXPOSE 3008

COPY . .

CMD ["npm", "run", "start"]
