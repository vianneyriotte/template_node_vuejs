# ./node.dockerfile

FROM node:15.10.0-alpine3.12

RUN apk add --no-cache tzdata

ENV TZ Europe/Paris
RUN cp /usr/share/zoneinfo/Europe/Paris /etc/localtime

WORKDIR /app

COPY ./backend/package.json .

RUN npm install --loglevel verbose

COPY ./backend .

EXPOSE 3001

CMD npm start