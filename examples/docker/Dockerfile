FROM node:10-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install && mv package-lock.json /tmp/package-lock.json

# Copy app source code
COPY . /app
