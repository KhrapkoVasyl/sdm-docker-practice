# stage 1

FROM node:16.14.2-alpine3.14 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . . 

RUN npm run build

# stage 2

FROM node:16.14.2-alpine3.14

WORKDIR /app

COPY --from=build /app/dist /app/.env /app/package*.json ./

RUN npm ci --production

CMD ["node", "main.js"]