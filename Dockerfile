FROM node:15.5.0-alpine3.10 AS builder
WORKDIR /ts1
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

# Second Stage : Setup command to run your app using lightweight node image
FROM node:15.5.0-alpine3.10
WORKDIR /ts1
COPY --from=builder /ts1 ./
EXPOSE 10000
CMD ["npm", "run", "start"]