FROM node:alpine
WORKDIR /usr/app
COPY package.json .
RUN yarn install
COPY . .
ENV NODE_ENV=production
EXPOSE 3000
CMD [ "yarn", "start" ]