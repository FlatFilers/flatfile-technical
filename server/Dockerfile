FROM node:15.14.0-alpine3.10

WORKDIR /server

COPY . .

RUN npm install && npm install -g @nestjs/cli

EXPOSE 3001

ENTRYPOINT ["npm", "run", "start:dev"]
