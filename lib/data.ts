import User from "@models/User";

export async function setData(currentUser: User) {
  let response = await fetch("/api/user/set", {
    method: "POST",
    body: JSON.stringify(currentUser),
  });

  if (!response.ok) return "Error";
  else return response;
}

export async function getData(email: string): Promise<User> {
  let data = await fetch("/api/user/get", {
    method: "POST",
    body: JSON.stringify({ email: email }),
  });

  if (!data.ok) return new User("", "", [], [], [], [], [], []);

  return JSON.parse(await data.json());
}
