import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../hooks/use-current-user";
import { ProfileButton } from "./profile-button";
import { Divider } from "@mui/material";

export default function DrawerLogin() {
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
