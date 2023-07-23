FROM denoland/deno:alpine-1.35.2

ENV PORT=8080
ENV REDIS_URL=redis://redis

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

EXPOSE 8080
