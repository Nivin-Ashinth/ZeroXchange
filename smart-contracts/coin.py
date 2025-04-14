import hashlib
import time


class Block:
    def __init__(self, index, transactions, timestamp, previous_hash, nonce=0):
        self.index = index
        self.transactions = transactions
        self.timestamp = timestamp
        self.previous_hash = previous_hash
        self.nonce = nonce
        self.hash = self.compute_hash()

    def compute_hash(self):
        block_string = f"{self.index}{self.transactions}{self.timestamp}{self.previous_hash}{self.nonce}"
        return hashlib.sha256(block_string.encode()).hexdigest()


class Blockchain:
    difficulty = 2  # Adjust the difficulty as needed

    def __init__(self):
        self.unconfirmed_transactions = []
        self.chain = []
        self.create_genesis_block()

    def create_genesis_block(self):
        genesis_block = Block(0, [], time.time(), "0")
        self.chain.append(genesis_block)

    def last_block(self):
        return self.chain[-1]

    def proof_of_work(self, block):
        block.nonce = 0
        computed_hash = block.compute_hash()
        while not computed_hash.startswith('0' * Blockchain.difficulty):
            block.nonce += 1
            computed_hash = block.compute_hash()
        return computed_hash

    def add_block(self, block, proof):
        previous_hash = self.last_block().hash
        if previous_hash != block.previous_hash:
            return False
        if not self.is_valid_proof(block, proof):
            return False
        block.hash = proof
        self.chain.append(block)
        return True

    def is_valid_proof(self, block, block_hash):
        return (block_hash.startswith('0' * Blockchain.difficulty) and
                block_hash == block.compute_hash())


import json

from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec


class Transaction:
    def __init__(self, sender_public_key, recipient_address, amount):
        self.sender_public_key = sender_public_key
        self.recipient_address = recipient_address
        self.amount = amount
        self.signature = None

    def to_dict(self):
        return {
            'sender_public_key': self.sender_public_key,
            'recipient_address': self.recipient_address,
            'amount': self.amount
        }

    def sign_transaction(self, private_key):
        transaction_data = json.dumps(self.to_dict(), sort_keys=True).encode()
        signature = private_key.sign(transaction_data, ec.ECDSA(hashes.SHA256()))
        self.signature = signature.hex()

    def is_valid(self):
        if self.signature is None:
            return False
        public_key = serialization.load_pem_public_key(self.sender_public_key.encode())
        transaction_data = json.dumps(self.to_dict(), sort_keys=True).encode()
        try:
            public_key.verify(bytes.fromhex(self.signature), transaction_data, ec.ECDSA(hashes.SHA256()))
            return True
        except:
            return False
from cryptography.hazmat.primitives import serialization


def generate_wallet():
    private_key = ec.generate_private_key(ec.SECP256K1())
    public_key = private_key.public_key()

    private_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()).decode()

    public_pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo).decode()

    return private_pem, public_pem


from flask import Flask, jsonify, request

app = Flask(__name__)
blockchain = Blockchain()

@app.route('/new_transaction', methods=['POST'])
def new_transaction():
    tx_data = request.get_json()
    required_fields = ['sender_public_key', 'recipient_address', 'amount', 'signature']
    if not all(field in tx_data for field in required_fields):
        return 'Invalid transaction data', 400
    transaction = Transaction(
        tx_data['sender_public_key'],
        tx_data['recipient_address'],
        tx_data['amount']
    )
    transaction.signature = tx_data['signature']
    if not transaction.is_valid():
        return 'Invalid signature', 400
    blockchain.unconfirmed_transactions.append(transaction)
    return 'Transaction added', 201

@app.route('/mine', methods=['GET'])
def mine():
    if not blockchain.unconfirmed_transactions:
        return 'No transactions to mine', 400
    last_block = blockchain.last_block()
    new_block = Block(index=last_block.index + 1,
                      transactions=[tx.to_dict() for tx in blockchain.unconfirmed_transactions],
                      timestamp=time.time(),
                      previous_hash=last_block.hash)
    proof = blockchain.proof_of_work(new_block)
    blockchain.add_block(new_block, proof)
    blockchain.unconfirmed_transactions = []
    return f'Block #{new_block.index} is mined.', 200

@app.route('/chain', methods=['GET'])
def get_chain():
    chain_data = []
    for block in blockchain.chain:
        chain_data.append({
            'index': block.index,
            'transactions': block.transactions,
            'timestamp': block.timestamp,
            'previous_hash': block.previous_hash,
            'nonce': block.nonce,
            'hash': block.hash
        })
    return jsonify({'length': len(chain_data), 'chain': chain_data})


