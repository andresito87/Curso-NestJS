FROM node:20-alpine AS deps
# Install libc6-compat for compatibility with certain Node.js modules
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
# Install dependencies based on the preferred package manager
RUN yarn install --frozen-lockfile

# Build the app with cache dependencies
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Production image, copy all the files and run next
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
# Install production dependencies
RUN yarn install --prod
# Copy the built application from the builder stage, the dist directory
COPY --from=builder /app/dist ./dist

# Opcionales:
# Copiar el directorio y su contenido
# RUN mkdir -p ./pokedex

# COPY --from=builder ./app/dist/ ./app
# COPY ./.env ./app/.env

# Dar permiso para ejecutar la applicación
# RUN adduser --disabled-password pokeuser
# RUN chown -R pokeuser:pokeuser ./pokedex
# USER pokeuser

# EXPOSE 3000

# Start the application of the built dist directory
CMD [ "node","dist/main" ]