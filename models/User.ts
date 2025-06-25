export default class User {
  id: string;
  name: string;
  email: string;
  salary: number;
  expenses: any[];
  assets: any[];
  debts: any[];

  constructor(
    id: string,
    name: string,
    email: string,
    salary: number,
    expenses: any[],
    assets: any[],
    debts: any[]
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.salary = salary;
    this.expenses = expenses;
    this.assets = assets;
    this.debts = debts;
  }
}
