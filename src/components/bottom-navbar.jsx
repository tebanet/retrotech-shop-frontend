import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export function BottomNavBar() {
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
					<Link to="/:user" className="flex flex-col items-center">
						<AccountCircleOutlinedIcon />
						{/* {userToken ? avatarusuario : <AccountCircleOutlinedIcon />} */}
						Perfil
					</Link>
				</li>
			</ul>
		</nav>
	);
}
