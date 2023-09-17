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
import { Link, useNavigate } from "react-router-dom";
import { ProfileButton } from "./profile-button";
import { Button, Divider } from "@mui/material";
import { useLogout } from "../hooks/use-logout";
import { useCurrentUser } from "../hooks/use-current-user";

export default function DrawerLogout() {
  const logout = useLogout();

  const currentUser = useCurrentUser();

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
      <List>
        <Link to="/profile">
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
          to="/"
          onClick={() => {
            logout();
          }}
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
    </Box>
  );

  return (
    <div className="w-6 h-6">
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <span className="flex flex-col items-center">
            <ProfileButton
              user={currentUser}
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
