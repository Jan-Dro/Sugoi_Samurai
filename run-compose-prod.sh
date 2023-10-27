#!/bin/sh

# The Dockerhub account where the images are stored
export DOCKERHUB_UNAME=jandroo

# These environment variables come from command line arguments.
# They are consumed by the docker-compose file.
export SECRET_KEY=$1
export DEBUG=$2
export POSTGRES_DB=$3
export POSTGRES_USER=$4
export POSTGRES_PASSWORD=$5
export NEW_VERSION=$6
export AWS_SECRET_ACCESS_KEY=$7
export AWS_ACCESS_KEY_ID=$8
export API_KEY=$9

docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# make sure the postgres container is ready, then run migrations
sleep 10 
docker exec sugoi_samurai-api-1 python /src/manage.py makemigrations 
docker exec sugoi_samurai-api-1 python /src/manage.py migrate
