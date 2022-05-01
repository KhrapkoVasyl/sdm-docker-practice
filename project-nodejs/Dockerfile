FROM node:16.14

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . . 

CMD ["npm", "run", "start"]