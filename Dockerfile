FROM node:15.5.0 AS builder
WORKDIR /usr/src/app
COPY ./package.json ./
COPY ./tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build

# Second Stage : Setup command to run your app using lightweight node image
FROM node:15.5.0-alpine3.10
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./
EXPOSE 10000
CMD ["npm", "run", "start"]