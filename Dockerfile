FROM node:lts-alpine AS build

RUN npm install -g http-server

RUN mkdir /app


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


EXPOSE 8080

CMD ["http-server", "dist"] 