import LoginIcon from "@mui/icons-material/Login";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../hooks/use-current-user";
import { useEffect, useState } from "react";

export function Header() {
	const currentUser = useCurrentUser();
	const [login, setLogin] = useState(false);

	useEffect(() => {
		const isLoggedIn = currentUser !== null;
		setLogin(isLoggedIn);
	}, [currentUser]);

	console.log(login);

	return (
		<>
			<header className="flex flex-row items-center justify-between bg-[var(--secondary-color)] border-b border-b-black min-h-[4rem] px-4 gap-4 fixed right-0 left-0 lg:hidden">
				<Link to="/">
					<img
						src="/assets/logos/RT_Square_Logo.png"
						alt="logo de retrotech"
						className="w-12"
					/>
				</Link>
				<TextField size="small" fullWidth label="¡Busca algo!" id="buscar" />
			</header>
			<header className="hidden lg:flex flex-row items-center justify-between bg-[var(--secondary-color)] border-b border-b-black min-h-[4rem] px-4 gap-4 fixed right-0 left-0">
				<Link to="/">
					<img
						src="/assets/logos/RT_Line_Logo.png"
						alt="logo de retrotech"
						className="w-60"
					/>
				</Link>

				{login ? (
					<Link to="/:user">
						<img
							className="max-w-[2.5rem] rounded-lg"
							src={currentUser?.profile_pic}
							alt="user pfp"
						/>
					</Link>
				) : (
					<Button
						variant="outlined"
						sx={{
							borderColor: "#000000",
							color: "white",
						}}
						endIcon={<LoginIcon />}
					>
						<Link to="/login">¡Regístrate o inicia sesión!</Link>
					</Button>
				)}
			</header>
		</>
	);
}
