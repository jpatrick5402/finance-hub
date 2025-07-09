export default class User {
  email: string;
  full_name: string;
  salary: number;
  fixed_assets: {
    name: string;
    value: number;
    interest: number;
    category: string;
  }[];
  invested_assets: {
    name: string;
    value: number;
    interest: number;
    category: string;
  }[];
  debts: { name: string; value: number; interest: number; category: string }[];
  expenses: {
    name: string;
    value: number;
    category: string;
  }[];
  net_worth_history: { date: string; value: number }[];

  constructor(
    email: string,
    full_name: string,
    salary: number,
    fixed_assets: {
      name: string;
      value: number;
      interest: number;
      category: string;
    }[],
    invested_assets: {
      name: string;
      value: number;
      interest: number;
      category: string;
    }[],
    debts: {
      name: string;
      value: number;
      interest: number;
      category: string;
    }[],
    expenses: {
      name: string;
      value: number;
      category: string;
    }[],
    net_worth_history: { date: string; value: number }[]
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
