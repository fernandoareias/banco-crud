const { gql } = require('apollo-server-express');

const transactionTypeDefs = gql`
  type Account {
    id: ID!
    accountNumber: String!
    balance: Float!
    transactions: [Transaction]
  }

  type Transaction {
    id: ID!
    type: String!
    amount: Float!
    fromAccount: Account
    toAccount: Account
    date: String!
  }

  type Query {
    transactions: [Transaction]
    accountBalance(accountId: ID!): Float
  }

  type Mutation {
    sendTransaction(fromAccountId: ID!, toAccountId: ID!, amount: Float!): Transaction
  }
`;

module.exports = transactionTypeDefs;
