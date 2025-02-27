SERVICE_NAME = agile-ai

.PHONY: all install enable start status logs stop disable clean deps start_dev_server deploy dev

# ----------Development commands----------
all: dev

deps:
	@echo "Installing dependencies ..."
	poetry install

database:
	@echo "Upgrading database..."
	poetry run alembic upgrade head

start_dev_server:
	@echo "Starting development server ..."
	poetry run uvicorn app.main:app --host=0.0.0.0 --port=8000 --reload

# format:
# 	@echo "Formatting code ..."
# 	poetry run black --line-length 100 --skip-string-normalization --skip-magic-trailing-comma --target-version py310 app

dev: deps database start_dev_server

# ----------Production commands (Docker)----------
build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f

shell:
	docker compose exec $(SERVICE_NAME) /bin/bash

clean:
	docker compose down -v
	docker system prune -af

git_pull:
	git pull origin main

deploy: down git_pull build up logs
	@echo "Deployment complete"

restart: down up logs
	@echo "Application reloaded"

refresh: down git_pull up logs
	@echo "Application reloaded"