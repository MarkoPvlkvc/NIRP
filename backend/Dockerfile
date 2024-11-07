FROM node:16-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN npm install

COPY ./backend/dist ./backend/dist

COPY ./frontend ./frontend

EXPOSE 3000

CMD ["node", "backend/dist/server.js"]