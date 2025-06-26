export default class User {
  id: string;
  email: string;
  full_name: string;
  salary: number;
  assets: any[];
  debts: any[];
  expenses: any[];

  constructor(
    id: string,
    email: string,
    full_name: string,
    salary: number,
    assets: any[],
    debts: any[],
    expenses: any[]
  ) {
    this.id = id;
    this.full_name = full_name;
    this.email = email;
    this.salary = salary;
    this.expenses = expenses;
    this.assets = assets;
    this.debts = debts;
  }
}
