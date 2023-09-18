import { useContext } from "react";
import jwt_decode from "jwt-decode";
import { CurrentUserUpdateContext } from "../contexts/auth-context.jsx";
import { CURRENT_USER_STORAGE_ID } from "../utils/constants.js";

export function useLogin() {
  const setCurrentUser = useContext(CurrentUserUpdateContext);

  return (token) => {
    localStorage.setItem(CURRENT_USER_STORAGE_ID, token);
    const user = jwt_decode(token);
    setCurrentUser(user);
  };
}
