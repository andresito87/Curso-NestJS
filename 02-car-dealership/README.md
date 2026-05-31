<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

Cars Dealership API built with NestJS and save data in memory. This API provides endpoints for managing car inventory, including creating, reading, updating, and deleting car records. It also includes endpoints to manage car brands and models, as well as a seeding endpoint to populate the database with sample data. The API is designed to be simple and efficient, allowing users to easily interact with the car dealership's inventory and manage their car records effectively.

## Project setup

```bash
yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

### Populate Database

```md
http://localhost:3000/cars/seed
```

### Api Documentation

[Postman Collection](./Cars-DealerShip.postman_collection.json)