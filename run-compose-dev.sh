#!/bin/bash

# These environment variables are consumed by the docker-compose file.
# We can supply explicit defaults that are checked in with source code 
# since they are only used for local development.
export SECRET_KEY=abc123
export DEBUG=True
export POSTGRES_DB=sugoi_db_1
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=postgres
export AWS_SECRET_ACCESS_KEY=$1
export AWS_ACCESS_KEY_ID=$2

docker-compose -f docker-compose.dev.yml up -d --build

# make sure the postgres container is ready, then run migrations
sleep 10 
docker exec sugoi_samurai-api-1  python /src/manage.py makemigrations 
docker exec sugoi_samurai-api-1  python /src/manage.py migrate