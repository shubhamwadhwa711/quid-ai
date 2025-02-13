#!/bin/bash
set -e

# Change directory to the Deployment folder
cd "$(dirname "$0")/Deployment"

echo "Building and starting backend and frontend services..."

docker-compose \
  -f docker-compose.yml \
  -f dev-compose-files/docker-compose.backend.yml \
  -f dev-compose-files/docker-compose.frontend.yml \
  up --build -d

echo "Deployment complete. Containers are up and running."
