interface Item {
  name: string;
  value: string;
  interest: string;
  category: string;
  active: boolean;
}

export default class User {
  email: string;
  full_name: string;
  income: Item[];
  fixed_assets: Item[];
  invested_assets: Item[];
  debts: Item[];
  expenses: Item[];
  net_worth_history: { date: string; value: string }[];

  constructor(
    email: string,
    full_name: string,
    income: Item[],
    fixed_assets: Item[],
    invested_assets: Item[],
    debts: Item[],
    expenses: Item[],
    net_worth_history: { date: string; value: string; active: boolean }[]
  ) {
    this.email = email;
    this.full_name = full_name;
    this.income = income;
    this.fixed_assets = fixed_assets;
    this.invested_assets = invested_assets;
    this.debts = debts;
    this.expenses = expenses;
    this.net_worth_history = net_worth_history;
  }
}
