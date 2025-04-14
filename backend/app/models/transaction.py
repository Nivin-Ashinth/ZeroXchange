# models/transaction.py
from datetime import datetime

from sqlalchemy import Column, DateTime, Float, Integer, String
from sqlalchemy.ext.declarative import declarative_base

# Create the base for declarative models
Base = declarative_base()

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    sender_wallet = Column(String, index=True)
    recipient_wallet = Column(String, index=True)
    amount = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    tx_hash = Column(String, nullable=True)  # Optional hash of the transaction

    def to_dict(self):
        return {
            "id": self.id,
            "sender_wallet": self.sender_wallet,
            "recipient_wallet": self.recipient_wallet,
            "amount": self.amount,
            "timestamp": self.timestamp.isoformat(),
            "tx_hash": self.tx_hash,
        }
