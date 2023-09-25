import { useEffect, useRef, useState } from "react";
import { getUserData } from "../api/get-user-data";
import { Avatar, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { ProductCard } from "../components/product-card";
import { getUserProducts } from "../api/get-all-products-by-username";
import IconButton from "@mui/material/IconButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { modifyUserPic } from "../api/put-modify-user-profile-pic";
import { Main } from "../components/main";

export function UserPage() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [userData, setUserData] = useState({});
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);

  const fetchUserData = async () => {
    const result = await getUserData(username);
    if (result.status === "ok") {
      setUserData(result.data);
    } else {
      navigate("/404");
    }
  };

  const shortDate = dayjs(userData.createdAt).format("DD/MM/YYYY");

  const fetchUserProducts = async () => {
    const result = await getUserProducts(username);
    if (result.status === "ok") {
      setProducts(result.data);
    }
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchUserData();
    fetchUserProducts();
  }, [username]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCameraIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const userId = userData.id;
    if (file && userId) {
      try {
        const result = await modifyUserPic(userId, file);
        if (result.status === "ok") {
          const newPicURL = result.data.picURL;
          setUserData((prevState) => ({
            ...prevState,
            profile_pic: newPicURL,
          }));
        } else {
          console.error("Error updating the image.");
        }
      } catch (error) {
        console.error("Connection error:", error);
      }
    }
  };

  return (
    <Main>
      <section
        className="flex"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative", alignItems: "center" }}
      >
        {isHovered && (
          <IconButton
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(255, 255, 255, 0.7)",
            }}
            onClick={handleCameraIconClick}
          >
            <PhotoCameraIcon />
          </IconButton>
        )}
        <Avatar
          sx={{ width: 150, height: 150 }}
          src={newProfilePic || userData.profile_pic}
          alt={"Foto de " + userData.username}
        />
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileInputChange}
          ref={fileInputRef}
        />
        <section className="flex flex-col pl-4">
          <h1>Hola, {userData.username}!</h1>
          <p>{userData.media_valoracion} Valoracion</p>
          <p>Usuario desde: {shortDate}</p>
        </section>
      </section>
      <h2 className="text-2xl">Productos</h2>
      <ul className="flex flex-row flex-wrap justify-around gap-8 md:flex-nowrap md:overflow-x-scroll">
        {products.map((product) => (
          <li key={product.product_id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Main>
  );
}
