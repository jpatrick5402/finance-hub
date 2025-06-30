type Debt = {
  name: string;
  value: number;
  APR: number;
};
type Asset = {
  name: string;
  value: number;
  APY: number;
};
type Expense = {
  name: string;
  value: number;
};

export default class User {
  email: string;
  full_name: string;
  salary: number;
  assets: Asset[];
  debts: Debt[];
  expenses: Expense[];

  constructor(
    email: string,
    full_name: string,
    salary: number,
    assets: any[],
    debts: any[],
    expenses: any[]
  ) {
    this.email = email;
    this.full_name = full_name;
    this.salary = salary;
    this.assets = assets;
    this.debts = debts;
    this.expenses = expenses;
  }
}
