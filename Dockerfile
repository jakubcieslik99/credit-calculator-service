FROM node:lts-alpine
WORKDIR /service
COPY package*.json .
RUN npm install
COPY . .
