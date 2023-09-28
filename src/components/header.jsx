import { Link, useNavigate } from "react-router-dom";
import AccountMenu from "./account-menu";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

export function Header() {
	const [title, setTitle] = useState("");
	const navigate = useNavigate();
	return (
		<>
			<header className="flex flex-row items-center justify-between bg-[var(--secondary-color)] border-b border-b-black min-h-[4rem] px-4 gap-4 fixed right-0 left-0 lg:hidden z-10">
				<Link to="/">
					<img
						src="/assets/logos/RT_Square_Logo.png"
						alt="logo de retrotech"
						className="w-12"
					/>
				</Link>
			</header>
			<header className="hidden lg:flex flex-row items-center justify-between bg-[var(--secondary-color)] border-b border-b-black min-h-[4rem] px-4 gap-4 fixed right-0 left-0 z-10">
				<Link to="/">
					<img
						src="/assets/logos/RT_Line_Logo.png"
						alt="logo de retrotech"
						className="w-60"
					/>
				</Link>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						navigate("/search?title=" + title);
					}}
					className="flex gap-4"
				>
					<TextField
						size="small"
						label="¿Qué buscas?"
						id="title"
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						sx={{
							width: "30rem",
						}}
					/>
					<Button type="submit" variant="contained">
						¡Buscar!
					</Button>
				</form>
				<AccountMenu />
			</header>
		</>
	);
}
