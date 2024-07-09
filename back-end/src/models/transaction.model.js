const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['send', 'receive'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  fromAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: function() { return this.type === 'send'; }
  },
  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: function() { return this.type === 'receive'; }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
