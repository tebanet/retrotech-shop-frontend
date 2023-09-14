import { Link } from "react-router-dom";
import { useCurrentUser } from "../hooks/use-current-user.js";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { ProfileButton } from "./profile-button.jsx";

export function BottomNavBar() {
	const currentUser = useCurrentUser();
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
					<Link to="/:user/favorites" className="flex flex-col items-center">
						<FavoriteBorderIcon />
						Favoritos
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
					<Link to="/login" className="flex flex-col items-center">
						<ProfileButton user={currentUser} />
						Perfil
					</Link>
				</li>
			</ul>
		</nav>
	);
}
