FROM node:14-alpine

EXPOSE 3001

WORKDIR /back-end

COPY package*.json .

RUN yarn install

COPY . .

RUN yarn run migration:run

ENTRYPOINT [ "yarn", "run", "dev" ]