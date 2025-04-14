#!/bin/bash
# filepath: restructure.sh
# Run this script from the "backend" folder (i.e. /home/pragadeesh/ZeroXchange/backend)
# Backup your work before proceeding!
set -e

# Define our base app folder
APP_DIR="app"

# 1. Create the crypto folder and its files inside backend/app
echo "Creating crypto folder..."
mkdir -p "${APP_DIR}/crypto"
touch "${APP_DIR}/crypto/__init__.py"

# Create a stub for wallet_utils.py (you can later add your crypto logic here)
cat << 'EOF' > "${APP_DIR}/crypto/wallet_utils.py"
# Cryptocurrency and wallet logic.
# Move your crypto-related functions here.

def generate_wallet(password: str) -> dict:
    # Your wallet generation logic goes here.
    # For now, it can just return a stub.
    return {
        "private_key": "stub_private_key",
        "public_key": "stub_public_key",
        "salt": "stub_salt"
    }
EOF

echo "Created ${APP_DIR}/crypto/wallet_utils.py."

# 2. Update the wallet endpoint to use the new crypto module.
# Rewrite the file at app/api/endpoints/wallet.py
echo "Updating API endpoint for wallet..."
cat << 'EOF' > "${APP_DIR}/api/endpoints/wallet.py"
# filepath: ${APP_DIR}/api/endpoints/wallet.py
from flask import Blueprint, jsonify, request
# Import the crypto logic from our new module.
from app.crypto.wallet_utils import generate_wallet

wallet_bp = Blueprint('wallet', __name__)

@wallet_bp.route('/create', methods=['POST'])
def create_wallet():
    """
    Expects a JSON payload with 'email', 'username', and 'password'.
    Returns a new wallet's public key, and the encrypted private key with salt.
    """
    data = request.get_json()
    required_fields = ['email', 'username', 'password']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    wallet = generate_wallet(data['password'])
    # Optionally, store user info and wallet details in the database.

    return jsonify({
        "email": data['email'],
        "username": data['username'],
        "public_key": wallet['public_key'],
        "encrypted_private_key": wallet['private_key'],
        "salt": wallet['salt'],
        "message": "Wallet created. Please back up your private key securely."
    }), 200
EOF

echo "Updated wallet endpoint to delegate crypto logic."

# 3. (Optional) Remove old pycache directories if they exist
echo "Cleaning up __pycache__ directories..."
find . -type d -name "__pycache__" -exec rm -rf {} +

echo "Re-structuring complete."