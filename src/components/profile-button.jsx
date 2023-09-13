import { useState } from "react";
import default_avatar from "/assets/users/default_avatar.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export function ProfileButton({ user }) {
	const [login, setLogin] = useState(false);

	function userLogged() {
		if (key == CURRENT_USER_STORAGE_ID) {
			setLogin(true);
		}
	}

	return (
		<button>
			{userLogged ? (
				<img
					className="max-w-[1.5rem] rounded-xl"
					src={user?.profile_pic ?? default_avatar}
					alt="pfp of user"
				/>
			) : (
				<AccountCircleOutlinedIcon />
			)}
		</button>
	);
}
