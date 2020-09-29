FROM node:10.16.2-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./package.json
COPY yarn.lock ./yarn.lock

RUN yarn

# start app
CMD ["yarn", "start"]