#!/usr/bin/env bash
# exit on error
set -o errexit

echo "🚀 Starting Lunotech deployment on Render..."

# Install dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --no-input

# Run database migrations
python manage.py migrate

echo "✅ Build completed!"