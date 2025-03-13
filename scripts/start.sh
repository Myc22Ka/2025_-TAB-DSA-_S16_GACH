#!/bin/bash

# Function displays help options
show_help() {
    echo "Użycie: ./scripts/start.sh [options]"
    echo ""
    echo "Options:"
    echo "  -l, --logs    Show logs for debbuging"
    echo "  -h, --help    Show help"
    exit 0
}

# Checking for -h parameter
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
    show_help
fi

# Checking, if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Error: docker-compose is not installed!"
    exit 1
fi

echo "🚀 Let's start session!"
docker-compose up -d

# Checking for -l parameter
if [[ "$1" != "-l" ]]; then
    echo "✅ You are good to go!"
    exit 0
fi

# Showing logs
docker-compose logs -f