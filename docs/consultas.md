# List transactions

http://localhost:4000/graphql

query {
transactions {
id
type
amount
fromAccount {
accountNumber
}
toAccount {
accountNumber
}
date
}
}

# Execute transaction

http://localhost:4000/graphql

mutation {
sendTransaction(fromAccountId: "000001", toAccountId: "000002", amount: 100.0) {
id
type
amount
fromAccount {
accountNumber
}
toAccount {
accountNumber
}
date
}
}

# Query balance

http://localhost:4000/graphql

query {
accountBalance(accountId: "000001")
}
