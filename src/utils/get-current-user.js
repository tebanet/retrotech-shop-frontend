import { CURRENT_USER_STORAGE_ID } from "./constants";
import jwt_decode from "jwt-decode";

export function getCurrentUserFromLocalStorage() {
  const token = localStorage.getItem(CURRENT_USER_STORAGE_ID);

  if (token) {
    const value = jwt_decode(token);
    return value;
  }
  return null;
}
