FROM node:18-alpine

WORKDIR /usr/src/service/analytics

COPY package*.json ./

RUN npm install 

EXPOSE 3001

COPY . .

CMD ["npm", "run", "start"]
