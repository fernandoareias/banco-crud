# Requests back-end

## Rodando o projeto

`docker-compose up --build`

## Queries e mutations

### List transactions

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

### Execute transaction

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

### Query balance

http://localhost:4000/graphql

query {
accountBalance(accountId: "000001")
}

## Registre as contas no mongoDB

### Conta 01

{
"\_id": {
"$oid": "668c6ead51016866ff42cd8e"
},
"accountNumber": "000002",
"balance": 1000,
"transactions": [

]
}

### Conta 02

{
"\_id": {
"$oid": "668c6ead51016866ff42cd8e"
},
"accountNumber": "000002",
"balance": 1000,
"transactions": [
]
}

# Applications

| Application    | Host                   |
| :------------- | :--------------------- |
| FRONT          | http://localhost:5001  |
| API            | http://localhost:4000  |
| MongoDB        | http://localhost:27017 |
| Prometheus     | http://localhost:9090  |
| Mongo exporter | http://localhost:9216  |
| Grafana        | http://localhost:3000  |

# Grafana

| User  | Password |
| :---- | :------- |
| admin | @admin   |

## Dashboards

### API

### Mongo DB

<img width="1440" alt="Screenshot 2024-07-08 at 20 48 49" src="https://github.com/fernandoareias/Shortener/assets/87771786/0ae36380-3055-44b3-9162-72bc63d4bbd8">

### Docker

<img width="1440" alt="Screenshot 2024-07-08 at 20 49 32" src="https://github.com/fernandoareias/Shortener/assets/87771786/9524a1af-cac5-4dc7-92a6-8b64e576d0be">
