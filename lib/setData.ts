import User from "@models/User";

export async function setData(currentUser: User) {
  let response = await fetch("/api/user/set", {
    method: "POST",
    body: JSON.stringify(currentUser),
  });

  if (!response.ok) return "Error";
  else return await response.json();
}
