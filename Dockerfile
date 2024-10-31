FROM node:22-alpine
LABEL authors="Loris VILA"

RUN mkdir -p "/home/node/app/node_modules" && chown -R node:node "/home/node/app"
WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

USER node
RUN npm install

COPY --chown=node:node . .

EXPOSE 80
EXPOSE 4200

CMD ["npm", "run", "start"]
