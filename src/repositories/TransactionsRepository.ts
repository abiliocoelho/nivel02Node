import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTrasactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): { transactions: Transaction[]; balance: Balance } {
    const balance = this.getBalance();
    return { transactions: this.transactions, balance };
  }

  public getBalance(): Balance {
    const inc = this.transactions.reduce((total, elemento): number => {
      if (elemento.type === 'income') {
        return (total += elemento.value);
      }
      return total;
    }, 0);

    const out = this.transactions.reduce((total, elemento): number => {
      if (elemento.type === 'outcome') {
        return (total += elemento.value);
      }
      return total;
    }, 0);
    return { income: inc, outcome: out, total: inc - out };
  }

  public create({ title, type, value }: CreateTrasactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
