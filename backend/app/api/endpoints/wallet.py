import base64
import os
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from flask import Blueprint, jsonify, request

wallet_bp = Blueprint('wallet', __name__)

def generate_wallet(password: str):
    # Generate a new ECDSA key pair (SECP256K1, common in crypto)
    private_key = ec.generate_private_key(ec.SECP256K1())
    public_key = private_key.public_key()

    # Derive a key from the user's password to encrypt the private key.
    salt = os.urandom(16)
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000,
    )
    key = kdf.derive(password.encode())

    # Serialize and encrypt the private key.
    private_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.BestAvailableEncryption(key)
    ).decode()

    public_pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    ).decode()

    return {
        "private_key": private_pem,
        "public_key": public_pem,
        "salt": base64.b64encode(salt).decode('utf-8')
    }

@wallet_bp.route('/generate', methods=['POST'])
def generate_wallet_endpoint():
    data = request.get_json()
    password = data.get('password')
    if not password:
        return jsonify({"error": "Password is required"}), 400

    wallet_data = generate_wallet(password)
    return jsonify(wallet_data), 200