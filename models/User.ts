export default class User {
  email: string;
  full_name: string;
  salary: number;
  fixed_assets: {
    name: string;
    value: string;
    interest: string;
    category: string;
  }[];
  invested_assets: {
    name: string;
    value: string;
    interest: string;
    category: string;
  }[];
  debts: { name: string; value: string; interest: string; category: string }[];
  expenses: {
    name: string;
    value: string;
    category: string;
  }[];
  net_worth_history: { date: string; value: string }[];

  constructor(
    email: string,
    full_name: string,
    salary: number,
    fixed_assets: {
      name: string;
      value: string;
      interest: string;
      category: string;
    }[],
    invested_assets: {
      name: string;
      value: string;
      interest: string;
      category: string;
    }[],
    debts: {
      name: string;
      value: string;
      interest: string;
      category: string;
    }[],
    expenses: {
      name: string;
      value: string;
      category: string;
    }[],
    net_worth_history: { date: string; value: string }[]
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
