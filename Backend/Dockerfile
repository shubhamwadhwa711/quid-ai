FROM python:3.14.0a5-alpine3.20

# Set working directory in the container
WORKDIR /app

# Install dependencies
RUN apk add --no-cache \
    curl \
    gcc \
    musl-dev \
    libffi-dev \
    openssl-dev \
    postgresql-dev \
    py3-pip \
    zlib-dev \
    rust \
    cargo \
    libjpeg-turbo-dev

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | python3 -

# Set environment variables for Poetry
ENV PATH="/root/.local/bin:$PATH"
ENV POETRY_VIRTUALENVS_CREATE=false
ENV PYTHONUNBUFFERED=1

COPY pyproject.toml poetry.lock /app/

# Install dependencies using Poetry
RUN poetry install --no-root

# List files (for debugging)
RUN ls 

# Copy project files
COPY . /app/

RUN python manage.py collectstatic --noinput
