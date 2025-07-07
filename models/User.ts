export type Item = {
  name: string;
  value: number;
  interest: number;
  category: string;
};

export default class User {
  email: string;
  full_name: string;
  salary: number;
  assets: Item[];
  debts: Item[];
  expenses: Item[];

  constructor(
    email: string,
    full_name: string,
    salary: number,
    assets: Item[],
    debts: Item[],
    expenses: Item[]
  ) {
    this.email = email;
    this.full_name = full_name;
    this.salary = salary;
    this.assets = assets;
    this.debts = debts;
    this.expenses = expenses;
  }
}
