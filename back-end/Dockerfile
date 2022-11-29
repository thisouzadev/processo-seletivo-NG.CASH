FROM node:14-alpine

EXPOSE 3001

WORKDIR /backend

COPY package*.json .

RUN yarn install

RUN yarn run migration:run

COPY . .

ENTRYPOINT [ "yarn", "run", "dev" ]