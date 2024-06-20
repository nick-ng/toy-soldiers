#!/bin/bash

git checkout -f main
git pull
PORT=3014
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml build --build-arg API_ORIGIN="https://toy-soldiers-server.pux.one"
docker compose -f docker-compose.prod.yml up -d
