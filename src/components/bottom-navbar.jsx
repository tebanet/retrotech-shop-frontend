import { Link } from "react-router-dom";
import { useCurrentUser } from "../hooks/use-current-user.js";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DrawerLogin from "./drawer-login.jsx";
import DrawerLogout from "./drawer-logout.jsx";
import { useEffect, useState } from "react";

export function BottomNavBar() {
	const [login, setLogin] = useState(false);

	const currentUser = useCurrentUser();

	useEffect(() => {
		const isLoggedIn = currentUser !== null;
		setLogin(isLoggedIn);
	}, [currentUser]);

	return (
		<nav className="bg-[var(--secondary-color)] fixed bottom-0 right-0 left-0 border-t border-t-black lg:hidden">
			<ul className="flex justify-around min-h-[4rem] items-center">
				<li className="w-1/5">
					<Link to="/" className="flex flex-col items-center">
						<HomeOutlinedIcon />
						Inicio
					</Link>
				</li>
				<li className="w-1/5">
					<Link to="/search" className="flex flex-col items-center">
						<SearchIcon />
						Buscar
					</Link>
				</li>
				<li className="w-1/5">
					<Link to="/new-item" className="flex flex-col items-center">
						<AddCircleOutlineIcon />
						Subir
					</Link>
				</li>
				<li className="w-1/5">
					<Link to="/:user/inbox" className="flex flex-col items-center">
						<MailOutlineIcon />
						Buzon
					</Link>
				</li>
				<li className="w-1/5">
					<Link className="flex flex-col items-center h-12">
						{login ? <DrawerLogout /> : <DrawerLogin />}
					</Link>
				</li>
			</ul>
		</nav>
	);
}
