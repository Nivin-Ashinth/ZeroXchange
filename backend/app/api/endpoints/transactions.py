from flask import Blueprint, jsonify, request
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import hashlib  # Needed for computing hash

from models.transaction import Transaction

# Set up the database engine; the database file will be "transactions.db" in your project root.
engine = create_engine('sqlite:///transactions.db')
SessionLocal = sessionmaker(bind=engine)

transactions_bp = Blueprint('transactions', __name__)

# GET all transactions endpoint
@transactions_bp.route('/', methods=['GET'])
def get_all_transactions():
    session = SessionLocal()
    transactions = session.query(Transaction).all()
    result = [tx.to_dict() for tx in transactions]
    session.close()
    return jsonify(result), 200

# GET transactions by wallet address
@transactions_bp.route('/<wallet_address>', methods=['GET'])
def get_transactions_by_wallet(wallet_address):
    session = SessionLocal()
    transactions = session.query(Transaction).filter(
        (Transaction.sender_wallet == wallet_address) | 
        (Transaction.recipient_wallet == wallet_address)
    ).all()
    result = [tx.to_dict() for tx in transactions]
    session.close()
    return jsonify(result), 200

# POST a new transaction (for testing or adding transactions)
@transactions_bp.route('/', methods=['POST'])
def add_transaction():
    tx_data = request.get_json()
    required_fields = ['sender_wallet', 'recipient_wallet', 'amount']
    if not all(field in tx_data for field in required_fields):
        return jsonify({"error": "Invalid transaction data"}), 400
    
    # Create the transaction instance. Optionally include a tx_hash if provided.
    transaction = Transaction(
        sender_wallet=tx_data['sender_wallet'],
        recipient_wallet=tx_data['recipient_wallet'],
        amount=tx_data['amount'],
        tx_hash=tx_data.get('tx_hash')
    )
    session = SessionLocal()
    session.add(transaction)
    session.commit()
    session.close()
    return jsonify(transaction.to_dict()), 201


# Endpoint to get transactions between specific wallets
@transactions_bp.route('/between', methods=['GET'])
def get_transactions_between_wallets():
    sender = request.args.get('sender')
    recipient = request.args.get('recipient')
    if not sender or not recipient:
        return jsonify({"error": "sender and recipient query parameters are required"}), 400
    session = SessionLocal()
    transactions = session.query(Transaction).filter(
        Transaction.sender_wallet == sender,
        Transaction.recipient_wallet == recipient
    ).all()
    result = [tx.to_dict() for tx in transactions]
    session.close()
    return jsonify(result), 200


# POST an endpoint to verify a transaction
@transactions_bp.route('/verify', methods=['POST'])
def verify_transaction():
    """
    Cross verify a transaction.
    Expected JSON payload should contain:
        - sender_wallet (sender's public key)
        - recipient_wallet (recipient's public key)
        - amount (coin amount)
        - tx_hash (transaction hash as generated)
    """
    data = request.get_json()
    sender = data.get('sender_wallet')
    recipient = data.get('recipient_wallet')
    amount = data.get('amount')
    tx_hash_provided = data.get('tx_hash')

    if not sender or not recipient or not amount or not tx_hash_provided:
        return jsonify({"error": "sender_wallet, recipient_wallet, amount and tx_hash are required"}), 400

    # Recompute the transaction hash using the provided details.
    # Here we combine sender_wallet, recipient_wallet and amount into a transaction string.
    transaction_string = f"{sender}{recipient}{amount}"
    computed_tx_hash = hashlib.sha256(transaction_string.encode()).hexdigest()

    # Compare the provided tx_hash with the computed hash.
    if computed_tx_hash != tx_hash_provided:
        return jsonify({"error": "Transaction verification failed"}), 400

    return jsonify({
        "message": "Transaction successfully verified",
        "tx_hash": computed_tx_hash
    }), 200