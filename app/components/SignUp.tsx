"use client";

import { signup } from "@actions/auth";
import { useActionState } from "react";

export default function Auth() {
  const [state, action, pending] = useActionState(signup, undefined);
  return (
    <div>
      <form action={action} className="flex align-center">
        <div className="m-auto flex flex-col">
          <input
            type="text"
            placeholder="Email"
            className="rounded-md bg-(--background-accent) text-center m-2"
          />
          {state?.errors?.email && <p>{state.errors.email}</p>}
          <input
            type="password"
            placeholder="Password"
            className="rounded-md bg-(--background-accent) text-center m-2"
          />
          {state?.errors?.password && (
            <div>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
          <button className="btn" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
