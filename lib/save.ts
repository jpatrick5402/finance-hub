import User from "@models/User";

export async function save(formValues: User, currentUser: User) {
  if (formValues.full_name == "") formValues.full_name = currentUser.full_name;
  if (formValues.salary == 0) formValues.salary = currentUser.salary;

  console.log(formValues);
  let response = await fetch("/api/user/set", {
    method: "POST",
    body: JSON.stringify(formValues),
  });

  if (!response.ok) return "Error";
  else return await response.json();
}
