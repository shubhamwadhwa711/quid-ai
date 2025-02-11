# FROM python:3.11.4-alpine

# WORKDIR /app

# RUN apk add --no-cache curl gcc musl-dev libffi-dev openssl-dev nano

# RUN curl -sSL https://install.python-poetry.org | python3 -

# ENV PATH="/root/.local/bin:$PATH"
# ENV POETRY_VIRTUALENVS_CREATE=false

# RUN /root/.local/bin/poetry --version

# RUN curl -sSL https://install.python-poetry.org | python3 -

# RUN poetry install 

# COPY . /app

# RUN poetry run python manage.py collectstatic

    
FROM python:3.11.4-alpine
 

 
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
    py3-pip
 
# Install Poetry
RUN curl -sSL https://install.python-poetry.org | python3 -
 
# Set environment variables for Poetry
ENV PATH="/root/.local/bin:$PATH"
ENV POETRY_VIRTUALENVS_CREATE=false
ENV PYTHONUNBUFFERED=1
 
 
COPY pyproject.toml poetry.lock /app/
 
# Install dependencies using Poetry
RUN poetry install --no-root
RUN ls 
COPY ../Backend /app/

RUN python manage.py collectstatic --noinput
 