FROM node:18.1.0-alpine

RUN apk update && apk add bash

RUN mkdir /home/node/server
COPY . /home/node/server

RUN chown -R node:node /home/node/server
RUN chmod 777 /home/node/server
RUN npm install -g nodemon

USER node

WORKDIR /home/node/server


RUN npm install