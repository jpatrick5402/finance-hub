import User from "@models/User";

export async function setData(currentUser: User) {
  let response = await fetch("/api/user/set", {
    method: "POST",
    body: JSON.stringify(currentUser),
  });

  if (!response.ok) return "Error";
  else return await response.json();
}

export async function getData(email: string): Promise<User> {
  let data = await fetch("/api/user/get", {
    method: "POST",
    body: JSON.stringify(email),
  });

  if (!data.ok) return new User("", "", 0, [], [], [], [], []);

  let response = JSON.parse(await data.json());

  return new User(
    response["email"],
    response["full_name"],
    response["salary"],
    JSON.parse(response["fixed_assets"]),
    JSON.parse(response["invested_assets"]),
    JSON.parse(response["debts"]),
    JSON.parse(response["expenses"]),
    JSON.parse(response["net_worth_history"])
  );
}
