FROM node:18-alpine

WORKDIR /usr/src/service/shipping

COPY package*.json ./

RUN npm install 

EXPOSE 3007

COPY . .

CMD ["npm", "run", "start"]
