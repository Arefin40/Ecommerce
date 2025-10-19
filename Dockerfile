# syntax=docker/dockerfile:1
FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies only first for caching
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Create non-root user
ARG UID=10001
RUN adduser --disabled-password --gecos "" --uid "${UID}" appuser
USER appuser

# Expose default Next.js port
EXPOSE 3000

# Start dev server
CMD ["npm", "run", "dev"]