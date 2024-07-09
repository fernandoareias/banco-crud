export class Account {
  accountNumber: string | null;
  balance: number | null;
  transactions: Transaction[];

  constructor(
    accountNumber: string | null = null,
    balance: number | null = null,
    transactions: Transaction[] = []
  ) {
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.transactions = transactions;
  }
}

export class Transaction {
  id: string;
  type: string;
  amount: number;
  fromAccount: Account | null;
  toAccount: Account | null;
  date: Date;

  constructor(id: string, type: string, amount: number, fromAccount: Account | null, toAccount: Account | null, date: Date) {
    this.id = id;
    this.type = type;
    this.amount = amount;
    this.fromAccount = fromAccount;
    this.toAccount = toAccount;
    this.date = date;
  }
}
