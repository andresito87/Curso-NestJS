<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://www.mongodb.com/" target="blank">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" width="120" alt="MongoDB Logo" />
  </a>
</p>

# Nest Pokémon API

A simple REST API built with NestJS, MongoDB and Mongoose.

The project is based on Pokémon data and includes a Docker Compose configuration to run a local MongoDB database in a container.

## Technology stack

* [NestJS](https://nestjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [Docker](https://www.docker.com/)
* [class-validator](https://www.npmjs.com/package/class-validator)

## Requirements

Before running the project, make sure you have installed:

* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* [Nest CLI](https://docs.nestjs.com/cli/overview)

You can install the Nest CLI globally with:

```bash
npm i -g @nestjs/cli
```

## Development setup

1.-Clone the repository:

```bash
git clone <repository-url>
cd <project-folder>
```

3.- Clone the file `.env.example` and rename it to `.env`:

```bash
cp .env.example .env
```

4.-Open the `.env` file and update the database connection values if necessary.


5.-Install dependencies:

```bash
yarn install
```

6.-Start the MongoDB database:

```bash
docker compose up -d
```

7.-Build DB data with the seeding endpoint:

```bash
http://localhost:3000/api/v2/seed
```

8.-Run the NestJS project in development mode:

```bash
yarn start:dev
```

## Run the project in production mode

1.-Create ```.env.prod``` file with production environment variables.

2.-Build the new image with docker file and run the containers with docker-compose:

```bash
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

## Docker commands

Start the database container:

```bash
docker compose up -d
```

Stop the database container:

```bash
docker compose down
```

Stop the database container and remove volumes:

```bash
docker compose down -v
```

> Warning: `docker compose down -v` removes the MongoDB volume and deletes the local database data.

## Available scripts

```bash
# Start the project
yarn start

# Start the project in watch mode
yarn start:dev

# Start the project in production mode
yarn start:prod

# Run tests
yarn test

# Run e2e tests
yarn test:e2e

# Run test coverage
yarn test:cov
```

## Database

The MongoDB database runs locally using Docker Compose.

Default connection values:

```txt
Host: localhost
Port: 27017
Database: nest-pokemon
Username: mongo
Password: mongo123
```

Connection URI:

```txt
mongodb://mongo:mongo123@localhost:27017/nest-pokemon?authSource=admin
```

## API endpoints

Endpoints will be documented here as the project evolves.

Example:

```txt
GET /pokemon
GET /pokemon/:id
POST /pokemon
PATCH /pokemon/:id
DELETE /pokemon/:id
```

## Deployment in Render

```https://nest-pokemons-app-2efw.onrender.com/```

## License

This project is for learning purposes.
