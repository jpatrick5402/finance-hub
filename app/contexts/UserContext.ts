import { createContext, Dispatch, SetStateAction } from "react";
import User from "@models/User";

const UserContext = createContext<[User, Dispatch<SetStateAction<User>>]>([
  new User("", "", 0, [], [], [], [], []),
  () => {},
]);

export default UserContext;
