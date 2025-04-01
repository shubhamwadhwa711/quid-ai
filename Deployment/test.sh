 docker compose \
      -f docker-compose.yml \
      -f dev-compose-files/docker-compose.backend.yml \
      -f dev-compose-files/docker-compose.frontend.yml \
      "$@"