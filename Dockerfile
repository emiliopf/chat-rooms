FROM node:14.2-alpine

WORKDIR /app
EXPOSE 3000
# ENTRYPOINT []
CMD ["npm", "run", "start:dev"]

COPY package* ./
RUN apk --no-cache add --virtual builds-deps build-base python && \
  npm install && \
  npm rebuild bcrypt --build-from-source
COPY . .
