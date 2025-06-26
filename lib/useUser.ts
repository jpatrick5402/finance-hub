import User from "@models/User";
import useSWR from "swr";

type Fetcher = (...args: [RequestInfo, RequestInit?]) => Promise<any>;

const fetcher: Fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useUser(id: string) {
  if (!id) return new User("", "", "", 0, [], [], []);

  const response = useSWR(`/api/user/get?id=${id}`, fetcher);
  let userData = response.data;

  if (!userData) return new User("", "", "", 0, [], [], []);

  return new User(
    userData["id"],
    userData["email"],
    userData["full_name"],
    userData["salary"],
    userData["assets"],
    userData["debts"],
    userData["expenses"]
  );
}
