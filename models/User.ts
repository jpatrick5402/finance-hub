export type Item = {
  name: string;
  value: number;
  interest: number;
  category: string;
};

export type net_worth_history = {
  date: string;
  value: number;
};

export default class User {
  email: string;
  full_name: string;
  salary: number;
  fixed_assets: Item[];
  invested_assets: Item[];
  debts: Item[];
  expenses: Item[];
  net_worth_history: net_worth_history[];

  constructor(
    email: string,
    full_name: string,
    salary: number,
    fixed_assets: Item[],
    invested_assets: Item[],
    debts: Item[],
    expenses: Item[],
    net_worth_history: net_worth_history[]
  ) {
    this.email = email;
    this.full_name = full_name;
    this.salary = salary;
    this.fixed_assets = fixed_assets;
    this.invested_assets = invested_assets;
    this.debts = debts;
    this.expenses = expenses;
    this.net_worth_history = net_worth_history;
  }
}
