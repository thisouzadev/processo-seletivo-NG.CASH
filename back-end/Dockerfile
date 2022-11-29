FROM node:18.12.1-alpine

WORKDIR /backend

COPY package*.json .

RUN yarn install

COPY . .

ENTRYPOINT [ "yarn", "run", "migration:run" ]