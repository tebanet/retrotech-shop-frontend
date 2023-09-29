import { Link, useLocation } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import UserDrawer from "./user-drawer.jsx";
import { Badge } from "@mui/material";
import { useCurrentUser } from "../hooks/use-current-user.js";
import { useEffect, useState } from "react";
import { getUnratedOrders } from "../api/get-unrated-orders.js";

export function BottomNavBar() {
  const location = useLocation();
  const currentUser = useCurrentUser();
  const username = currentUser?.username;
  const [unrated, setUnrated] = useState([]);
  async function getUnrated() {
    const result = await getUnratedOrders(username);
    if (result.status == "ok") {
      setUnrated(result.data);
    }
  }

  useEffect(() => {
    getUnrated();
  }, [location]);

  return (
    <nav className="bg-[var(--secondary-color)] fixed bottom-0 right-0 left-0 lg:hidden">
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
          <Link to="/products/new" className="flex flex-col items-center">
            <AddCircleOutlineIcon />
            Subir
          </Link>
        </li>
        <li className="w-1/5">
          <Link
            to={"/users/" + currentUser?.username + "/orders/rate"}
            className="flex flex-col items-center"
          >
            <Badge
              badgeContent={Object.keys(unrated).length}
              variant="dot"
              color="error"
            >
              <GradeOutlinedIcon />
            </Badge>
            Valorar
          </Link>
        </li>
        <li className="w-1/5">
          <Link className="flex flex-col items-center h-12">
            <UserDrawer />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
