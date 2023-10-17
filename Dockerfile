FROM node:18.18-alpine

ENV PORT=3200
ENV NODE_ENV=development

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

ADD . /app/

EXPOSE 3200

CMD ["node", "server.js" ]