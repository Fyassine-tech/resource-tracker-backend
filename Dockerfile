FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main.js"]



# syntax=docker/dockerfile:1.5
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,id=npm-cache,target=/root/.npm npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main.js"]