<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Proyecto Pokedex con Nest y MongoDB

## Installation

```bash
$ pnpm install
```

## Run Docker container for MongoDB

```bash
docker-compose up -d
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Cargar semilla

(deletes previous data)

```
http://localhost:3000/seed
```