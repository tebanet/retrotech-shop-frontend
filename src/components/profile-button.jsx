import { useEffect, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Avatar } from "@mui/material";

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
					src={user?.profile_pic}
				/>
			) : (
				<AccountCircleOutlinedIcon />
			)}
		</button>
	);
}
