import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { Link } from "react-router-dom";
import { ProfileButton } from "./profile-button";
import { Divider } from "@mui/material";
import { useLogout } from "../hooks/use-logout";
import { useCurrentUser } from "../hooks/use-current-user";
import { getUserData } from "../api/get-user-data";

export default function UserDrawer() {
	const [login, setLogin] = React.useState(false);

	const currentUser = useCurrentUser();

	const [userData, setUserData] = React.useState([]);
	async function fetchUserData() {
		const result = await getUserData(currentUser?.username);
		if (result.status == "ok") {
			setUserData(result.data);
		}
	}

	React.useEffect(() => {
		const isLoggedIn = currentUser !== null;
		setLogin(isLoggedIn);
		fetchUserData();
	}, [currentUser]);
	const logout = useLogout();

	const [state, setState] = React.useState({
		bottom: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor) => (
		<Box
			sx={{ width: "100%", backgroundColor: "var(--secondary-color)" }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			{login ? (
				<List>
					<Link to={"/users/" + currentUser?.username}>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<ManageAccountsOutlinedIcon />
								</ListItemIcon>
								<ListItemText primary="Mi cuenta" />
							</ListItemButton>
						</ListItem>
					</Link>
					<Divider />
					<List>
						<Link to="/users/update">
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemIcon>
										<ContactMailOutlinedIcon />
									</ListItemIcon>
									<ListItemText primary="Modificar mis datos" />
								</ListItemButton>
							</ListItem>
						</Link>
					</List>
					<Divider />
					<Link
						onMouseDown={() => {
							logout();
						}}
						to="/"
					>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<LoginOutlinedIcon />
								</ListItemIcon>
								<ListItemText primary="Cerrar sesión" />
							</ListItemButton>
						</ListItem>
					</Link>
				</List>
			) : (
				<List>
					<Link to="/login">
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<LoginOutlinedIcon />
								</ListItemIcon>
								<ListItemText primary="¡Inicia sesión!" />
							</ListItemButton>
						</ListItem>
					</Link>
					<Divider />
					<Link to="/register">
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<PersonAddAltOutlinedIcon />
								</ListItemIcon>
								<ListItemText primary="¡Únete a RetroTech!" />
							</ListItemButton>
						</ListItem>
					</Link>
				</List>
			)}
		</Box>
	);

	return (
		<div className="w-6 h-6">
			{["bottom"].map((anchor) => (
				<React.Fragment key={anchor}>
					<span className="flex flex-col items-center">
						<ProfileButton
							user={userData}
							onClick={toggleDrawer(anchor, true)}
						/>
						<p>Perfil</p>
					</span>
					<Drawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
					>
						{list(anchor)}
					</Drawer>
				</React.Fragment>
			))}
		</div>
	);
}
