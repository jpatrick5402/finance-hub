class Asset {
  name: string;
  value: number;
  APY: number;

  constructor(name: string, value: number, APY: number) {
    this.name = name;
    this.value = value;
    this.APY = APY;
  }
}

class Debt {
  name: string;
  value: number;
  APR: number;

  constructor(name: string, value: number, APR: number) {
    this.name = name;
    this.value = value;
    this.APR = APR;
  }
}

class Expense {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

export default class User {
  name: string;
  email: string;
  salary: number;
  expenses: any[];
  assets: any[];
  debts: any[];

  constructor(
    name: string,
    email: string,
    salary: number,
    expenses: any[],
    assets: any[],
    debts: any[]
  ) {
    this.name = name;
    this.email = email;
    this.salary = salary;
    this.expenses = expenses;
    this.assets = assets;
    this.debts = debts;
  }
}
