FROM node:18.12.1-alpine

WORKDIR /app-backend

COPY . .

RUN yarn install

RUN yarn run migration:run

CMD ["yarn","run", "dev"]