FROM node:16-alpine

WORKDIR /www
COPY package*.json ./
RUN npm install

ENV PATH=/www/node_modules/.bin:$PATH
WORKDIR /www/app
COPY . .

CMD ["npm", "run", "serve"]
