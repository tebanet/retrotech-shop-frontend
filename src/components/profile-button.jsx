import { useEffect, useState } from "react";
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

<<<<<<< HEAD
	return (
		<button onClick={onClick}>
			{login ? (
				<Avatar
					className="max-w-[1.5rem] max-h-[1.5rem]"
					alt="user pfp"
					src={user?.profile_pic}
				/>
			) : (
				<AccountCircleOutlinedIcon />
			)}
		</button>
	);
=======
  return (
    <button onClick={onClick}>
      {login ? (
        <Avatar
          className="max-w-[1.5rem] max-h-[1.5rem]"
          alt="Foto de Perfil"
          src={
            user.profile_pic ||
            API_HOST + "/profile_pics/default_profile_pic.webp"
          }
        />
      ) : (
        <AccountCircleOutlinedIcon />
      )}
    </button>
  );
>>>>>>> main
}
