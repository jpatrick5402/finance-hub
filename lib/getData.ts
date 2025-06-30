import User from "@models/User";

export async function getData(email: string): Promise<User> {
  let data = await fetch("/api/user/get", {
    method: "POST",
    body: JSON.stringify(email),
  });

  if (!data.ok) return new User("", "", 0, [], [], []);

  let response = JSON.parse(await data.json());

  return new User(
    response["email"],
    response["full_name"],
    response["salary"],
    JSON.parse(response["assets"]),
    JSON.parse(response["debts"]),
    JSON.parse(response["expenses"])
  );
}
