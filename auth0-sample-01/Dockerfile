# Build Stage
FROM node:20.2.0-alpine AS build

# Install necessary system dependencies
RUN apk add --no-cache bash git openssh

WORKDIR /app

# Enable corepack for Yarn
RUN corepack enable

# Copy package.json and install dependencies before copying the source code
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Copy source code and build
COPY . . 
RUN yarn build

# Production Stage
FROM node:20.2.0-alpine

WORKDIR /app

# Install only required system dependencies
RUN apk add --no-cache git

# Enable corepack (if Node.js version supports it)
RUN corepack enable

# # Alternatively, manually install Yarn (safer option)
# RUN npm install -g yarn

# Copy package.json and install production dependencies
COPY --from=build /app/package.json /app/yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Copy build output and required files
COPY --from=build /app/build ./build
COPY --from=build /app/server.js .
COPY --from=build /app/api-server.js .
COPY --from=build /app/src/auth_config.json ./src/auth_config.json


# Optional: Mount the config file instead of copying it
# VOLUME ["/app/src/auth_config.json"]

# Expose necessary ports
EXPOSE 3000 3001

# Define environment variables
ENV SERVER_PORT=3000
ENV API_PORT=3001
ENV NODE_ENV=production

# Start the application
CMD ["yarn", "prod"]
