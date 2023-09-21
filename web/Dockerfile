FROM node:15.14.0-alpine3.10

WORKDIR /web

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm", "start"]