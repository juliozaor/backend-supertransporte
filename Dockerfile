FROM node:18-bullseye
WORKDIR /app
COPY package*.json /app/
COPY .env /app/
COPY . .
RUN npm install --production 
RUN npm install -g @adonisjs/cli
RUN npm install @adonisjs/ace --save
RUN node ace build 
EXPOSE 3333
CMD [ "node", "ace", "serve" ]