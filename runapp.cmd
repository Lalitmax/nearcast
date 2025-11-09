@echo off
SET ACTION=%1

IF "%ACTION%"=="" (
    echo Usage: runapp.bat [up|down]
    exit /b
)

IF /I "%ACTION%"=="up" (
    echo Starting Spring Boot app with Docker Compose...
    docker compose -f docker-compose-dev.yml --env-file .env up --build
    exit /b
)

IF /I "%ACTION%"=="down" (
    echo Stopping Spring Boot app containers...
    docker compose -f docker-compose-dev.yml down
    exit /b
)

echo Invalid action. Use 'up' or 'down'.
