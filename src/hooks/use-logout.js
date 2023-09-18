import { useContext } from "react";
import { CurrentUserUpdateContext } from "../contexts/auth-context";
import { CURRENT_USER_STORAGE_ID } from "../utils/constants";

export function useLogout() {
  const setCurrentUser = useContext(CurrentUserUpdateContext);

  return () => {
    localStorage.removeItem(CURRENT_USER_STORAGE_ID);
    setCurrentUser(null);
  };
}
