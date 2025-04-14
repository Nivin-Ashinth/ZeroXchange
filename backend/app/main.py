from flask import Flask, jsonify, request, Blueprint
import os
import base64
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

app = Flask(__name__)

# Root endpoint: lists all available routes
@app.route('/')
def home():
    routes = []
    for rule in app.url_map.iter_rules():
        # Skip static endpoints if any
        if rule.endpoint == 'static':
            continue
        routes.append({
            "endpoint": rule.endpoint,
            "methods": list(rule.methods),
            "url": str(rule)
        })
    return jsonify({
        "message": "Available API paths",
        "paths": routes
    }), 200

# ---------- Transactions Blueprint ----------
transactions_bp = Blueprint('transactions', __name__, url_prefix='/transaction')

@transactions_bp.route('/', methods=['POST'])
def make_transaction():
    data = request.get_json()
    sender = data.get('sender')         # sender's wallet public key
    recipient = data.get('recipient')   # recipient's wallet public key
    amount = data.get('amount')         # coin amount to transfer

    if not sender or not recipient or not amount:
        return jsonify({"error": "sender, recipient and amount are required"}), 400

    # Transaction logic goes here.
    tx_hash = "demo_tx_hash_123"    # Replace with actual transaction logic

    return jsonify({
        "message": "Transaction executed successfully",
        "tx_hash": tx_hash
    }), 200

# ---------- Wallet Blueprint ----------
wallet_bp = Blueprint('wallet', __name__, url_prefix='/wallet')

def generate_wallet(password: str):
    # Generate a new ECDSA key pair (using SECP256K1)
    private_key = ec.generate_private_key(ec.SECP256K1())
    public_key = private_key.public_key()

    # Derive a key from the user's password to encrypt the private key.
    salt = os.urandom(16)
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000
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

@wallet_bp.route('/', methods=['GET'])
def wallet_info():
    # Basic wallet info endpoint (can be extended)
    return jsonify({"message": "Wallet endpoint works"}), 200

@wallet_bp.route('/create', methods=['POST'])
def create_wallet():
    data = request.get_json()
    password = data.get('password')
    if not password:
        return jsonify({"error": "Password is required to create a wallet"}), 400

    wallet_data = generate_wallet(password)
    return jsonify(wallet_data), 200

# Register Blueprints
app.register_blueprint(transactions_bp)
app.register_blueprint(wallet_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)