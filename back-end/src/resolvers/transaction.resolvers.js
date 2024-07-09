const { findAccountByNumber } = require('../repositories/account.repository');
const Account = require('../models/account.model');
const Transaction = require('../models/transaction.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const transactionResolvers = {
  Query: {
    transactions: async () => await Transaction.find().populate('fromAccount toAccount'),
    accountBalance: async (_, { accountId }) => {
      const account = await findAccountByNumber(accountId);
      
      return account.balance;
    }
  },
  Mutation: {
    sendTransaction: async (_, { fromAccountId, toAccountId, amount }) => {
      try {
        console.log("[+][SEND TRANSACTIONS] - Enviando " + amount + " de " + fromAccountId + " para " + toAccountId);
        const fromAccount = await findAccountByNumber(fromAccountId);

        if(!fromAccount){
          throw new Error('Não foi possível encontrar a conta de origem da transação.');
        }

        const toAccount = await findAccountByNumber(toAccountId);

        if (!toAccount) {
          throw new Error('Não foi possível encontrar a conta de destino da transação');
        }

        if (fromAccount.balance < amount) {
          throw new Error('Saldo insuficiente.');
        }

        const sendTransaction = new Transaction({
          _id: new ObjectId(),
          type: 'send',
          amount,
          fromAccount: fromAccount,
          toAccount: toAccount
        });

        const receiveTransaction = new Transaction({
          _id: new ObjectId(),
          type: 'receive',
          amount,
          fromAccount: fromAccount,
          toAccount: toAccount
        });

        fromAccount.transactions.push(sendTransaction);
        toAccount.transactions.push(receiveTransaction);

        fromAccount.balance -= amount;
        toAccount.balance += amount;

        await sendTransaction.save();
        await receiveTransaction.save();
        await fromAccount.save();
        await toAccount.save();

        return sendTransaction;
      } catch (error) {
        console.error('Error sending transaction:', error);
        throw new Error('Error sending transaction');
      }
    }
  }
};

module.exports = transactionResolvers;
