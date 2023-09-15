import { useEffect, useState } from "react";
import default_avatar from "/assets/users/default_avatar.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

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
				<img
					className="max-w-[1.4rem] rounded-xl"
					src={
						"http://localhost:3000/uploads/" + user?.profile_pic ??
						default_avatar
					}
					alt="pfp of user"
				/>
			) : (
				<AccountCircleOutlinedIcon />
			)}
		</button>
	);
}
