import { useContext } from "react";
import { CurrentUserContext } from "../contexts/auth-context.jsx";

export function useCurrentUser() {
  const currentUser = useContext(CurrentUserContext);
  return currentUser;
}
