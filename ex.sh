#!/bin/bash
# filepath: restructure_final.sh
# Run this script from the project root.
# Please back up your work before proceeding.
set -e

# 1. Move crypto folder from backend/app/app/crypto to backend/app/crypto if not already there.
if [ -d "backend/app/app/crypto" ]; then
    echo "Moving crypto folder from backend/app/app to backend/app..."
    # Ensure backend/app/crypto does not already exist or remove it first if needed.
    if [ -d "backend/app/crypto" ]; then
        echo "backend/app/crypto exists. Removing duplicate..."
        rm -rf backend/app/crypto
    fi
    mv backend/app/app/crypto backend/app/
    # Remove the now-empty backend/app/app directory if it exists.
    if [ -d "backend/app/app" ]; then
        echo "Removing empty backend/app/app directory..."
        rmdir backend/app/app || true
    fi
fi

# 2. Remove the root-level "app" directory if it exists.
if [ -d "app" ]; then
    echo "Removing root-level app directory..."
    rm -rf app
fi

# 3. Clean up any __pycache__ directories in backend.
echo "Cleaning up __pycache__ directories in the backend..."
find backend -type d -name "__pycache__" -exec rm -rf {} +

echo "File structure reorganization complete."
