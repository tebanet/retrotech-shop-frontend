import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useLogout } from "../hooks/use-logout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/use-current-user";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import { API_HOST } from "../utils/constants";
import { getUnratedOrders } from "../api/get-unrated-orders";
import { Badge } from "@mui/material";

export default function AccountMenu() {
	const currentUser = useCurrentUser();
	const username = currentUser?.username;
	const location = useLocation();
	const [login, setLogin] = React.useState(false);
	const logout = useLogout();

	React.useEffect(() => {
		const isLoggedIn = currentUser !== null;
		setLogin(isLoggedIn);
	}, [currentUser]);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const [unrated, setUnrated] = React.useState([]);
	async function getUnrated() {
		const result = await getUnratedOrders(username);
		if (result.status == "ok") {
			setUnrated(result.data);
		}
	}

	React.useEffect(() => {
		getUnrated();
	}, [location]);

	return (
		<React.Fragment>
			<Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
				<Tooltip title="Ajuste de cuentas">
					<IconButton
						onClick={handleClick}
						size="small"
						sx={{ ml: 2 }}
						aria-controls={open ? "account-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
					>
						{login ? (
							<Badge
								badgeContent={Object.keys(unrated).length}
								variant="dot"
								color="error"
							>
								<Avatar alt="user pfp" src={currentUser?.profile_pic} />
							</Badge>
						) : (
							<Avatar />
						)}
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				{login ? (
					<nav>
						<Link to={"/users/" + currentUser?.username}>
							<MenuItem onClick={handleClose}>
								<ListItemIcon>
									<PersonSearchOutlinedIcon />
								</ListItemIcon>
								Perfil
							</MenuItem>
						</Link>
						<Link to="/products/new">
							<MenuItem onClick={handleClose}>
								<ListItemIcon>
									<AddBusinessOutlinedIcon />
								</ListItemIcon>
								Añadir producto
							</MenuItem>
						</Link>
						<Link to={"/users/" + username + "/orders/rate"}>
							<MenuItem onClick={handleClose}>
								<ListItemIcon>
									<Badge
										badgeContent={Object.keys(unrated).length}
										variant="dot"
										color="error"
									>
										<GradeOutlinedIcon />
									</Badge>
								</ListItemIcon>
								Valorar
							</MenuItem>
						</Link>
						<Divider />
						<Link to="/users/update">
							<MenuItem onClick={handleClose}>
								<ListItemIcon>
									<Settings fontSize="small" />
								</ListItemIcon>
								Ajustes
							</MenuItem>
						</Link>
						<MenuItem
							onClick={() => {
								logout();
								navigate("/");
								handleClose;
							}}
						>
							<ListItemIcon>
								<Logout fontSize="small" />
							</ListItemIcon>
							Logout
						</MenuItem>
					</nav>
				) : (
					<nav>
						<Link to="/login">
							<MenuItem onClick={handleClose}>
								<ListItemIcon>
									<LoginOutlinedIcon />
								</ListItemIcon>
								Login
							</MenuItem>
						</Link>
						<Link to="/register">
							<MenuItem onClick={handleClose}>
								<ListItemIcon>
									<PersonAddAltOutlinedIcon />
								</ListItemIcon>
								Registrate
							</MenuItem>
						</Link>
					</nav>
				)}
			</Menu>
		</React.Fragment>
	);
}
