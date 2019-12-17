FROM node:10-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

# COPY schema.sql /docker-entrypoint-initdb.d

RUN npm install

RUN apk update && apk add bash

EXPOSE 3008

# ENTRYPOINT bash -c "./wait-for-it.sh database:3306 && npm run seed-db && npm run start"



