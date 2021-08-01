FROM node:12.18-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["yarn", "start"]
