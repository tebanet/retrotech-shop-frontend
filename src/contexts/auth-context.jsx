import { createContext, useEffect, useState } from "react";
import { CURRENT_USER_STORAGE_ID } from "../utils/constants";
import { getCurrentUserFromLocalStorage } from "../utils/get-current-user";

export const CurrentUserContext = createContext(null);
export const CurrentUserUpdateContext = createContext(() => {});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(getCurrentUserFromLocalStorage());
    window.addEventListener("storage", () => {
      if (key == CURRENT_USER_STORAGE_ID) {
        setUser(getCurrentUserFromLocalStorage());
      }
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={user}>
      <CurrentUserUpdateContext.Provider value={setUser}>
        {children}
      </CurrentUserUpdateContext.Provider>
    </CurrentUserContext.Provider>
  );
}
