FROM node:14-alpine

EXPOSE 3000

WORKDIR /opt/trybe-todo-list-frontend

COPY package*.json .

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "start" ]