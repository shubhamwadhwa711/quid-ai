#!/bin/bash
set -e

# Change directory to the Deployment folder
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "--------- $SCRIPT_DIR"
cd "$SCRIPT_DIR/Deployment"

echo "Building and starting backend and frontend services..."

if [ "$#" -eq 0 ]; then
    docker-compose \
      -f docker-compose.yml \
      -f dev-compose-files/docker-compose.backend.yml \
      -f dev-compose-files/docker-compose.frontend.yml \
      up --build -d
    echo "Deployment complete. Containers are up and running."
else
    docker-compose \
      -f docker-compose.yml \
      -f dev-compose-files/docker-compose.backend.yml \
      -f dev-compose-files/docker-compose.frontend.yml \
      "$@"
fi

echo "Command executed."
