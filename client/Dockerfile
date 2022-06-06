FROM node:18.1.0-alpine

RUN apk update && apk add bash

RUN mkdir /home/node/client
COPY ./package.json /home/node/client
COPY ./package-lock.json /home/node/client


RUN chown -R node:node /home/node/client
RUN chmod 777 /home/node/client

USER node

WORKDIR /home/node/client


RUN npm install