FROM node:16.14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@8.8.0

RUN npm ci

COPY . . 

CMD ["npm", "run", "start"]