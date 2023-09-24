import { useEffect, useState } from "react";
import default_avatar from "/assets/users/default_avatar.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Avatar } from "@mui/material";
import { API_HOST } from "../utils/constants";

export function ProfileButton({ user, onClick }) {
  const [login, setLogin] = useState(false);
  const currentUser = user;

  useEffect(() => {
    const isLoggedIn = currentUser !== null;
    setLogin(isLoggedIn);
  }, [currentUser]);

  return (
    <button onClick={onClick}>
      {login ? (
        <Avatar
          className="max-w-[1.5rem] max-h-[1.5rem]"
          alt="user pfp"
          src={API_HOST + "/profile_pics/default_profile_pic.webp"}
        />
      ) : (
        <AccountCircleOutlinedIcon />
      )}
    </button>
  );
}
