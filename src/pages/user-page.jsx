import { useEffect, useRef, useState, useCallback } from "react";
import { getUserData } from "../api/get-user-data";
import { Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { ProductCard } from "../components/product-card";
import { getUserProducts } from "../api/get-all-products-by-username";
import IconButton from "@mui/material/IconButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { modifyUserPic } from "../api/put-modify-user-profile-pic";
import { Main } from "../components/main";
import { useCurrentUser } from "../hooks/use-current-user";
import { toast } from "sonner";

export function UserPage() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);

  const fetchUserData = useCallback(async () => {
    const result = await getUserData(username);
    if (result.status === "ok") {
      setUserData(result.data);
    } else {
      navigate("/404");
    }
  }, [username, navigate]);

  const fetchUserProducts = useCallback(async () => {
    const result = await getUserProducts(username);
    if (result.status === "ok") {
      setProducts(result.data);
    }
  }, [username]);

  const shortDate = dayjs(userData.createdAt).format("DD/MM/YYYY");

  const [products, setProducts] = useState([]);

  const [accountOwnership, setAccountOwnership] = useState(false);
  const currentUser = useCurrentUser();

  const checkOwnership = useCallback(() => {
    if (username === currentUser?.username) {
      setAccountOwnership(true);
    }
  }, [username, currentUser]);

  useEffect(() => {
    fetchUserData();
    fetchUserProducts();
    checkOwnership();
  }, [username, fetchUserData, fetchUserProducts, checkOwnership]);

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
    console.log(userData);
    if (file && userId) {
      try {
        const result = await modifyUserPic(userId, file);
        if (result.status === "ok") {
          const newPicURL = result.data.picURL;
          setUserData((prevState) => ({
            ...prevState,
            profile_pic: newPicURL,
          }));
          setNewProfilePic(newPicURL);
          toast.success("Imagen de perfil cargada con éxito. 🎉");
        } else {
          toast.error("No se ha podido cargar la imagen. 😭");
          console.error("Error updating the image.");
          setError("Error updating the image.");
        }
      } catch (error) {
        console.error("Connection error:", error);
        setError("Connection error.");
      }
    }
  };

  return (
    <Main>
      <article className="flex justify-center">
        <section className="w-full lg:w-8/12 xl:w-7/12 bg-white rounded-lg shadow-md p-5">
          <span
            className="flex"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isHovered && (
              <IconButton
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "rgba(255, 255, 255, 0.7)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={handleCameraIconClick}
              >
                <PhotoCameraIcon />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileInputChange}
                  ref={fileInputRef}
                />
              </IconButton>
            )}

            <img
              className="w-32 h-32 rounded-full mx-auto"
              src={newProfilePic || userData.profile_pic}
              alt={"Foto de " + userData.username}
            />
          </span>
          <h2 className="text-center text-2xl font-semibold mt-3">
            {userData.username}
          </h2>
          <h3 className="text-center text-gray-600 mt-1">
            {userData.media_valoracion
              ? `${userData.media_valoracion}/5`
              : "Sin valoraciones"}
          </h3>
          <span className="flex justify-center mt-5">
            <p>Usuario desde: {shortDate}</p>
          </span>
          <span className="mt-5">
            <h3 className="text-xl font-semibold">Bio</h3>
            <p className="text-gray-600 mt-2">{userData.bio}</p>
          </span>
          <span className="flex justify-center mt-5 gap-4">
            <Link to={"/users/" + username + "/orders"}>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ width: "12rem" }}
              >
                Mis pedidos
              </Button>
            </Link>
            <Link to={"/users/" + username + "/offers"}>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ width: "12rem" }}
              >
                Mis ofertas
              </Button>
            </Link>
          </span>
        </section>
      </article>
      {accountOwnership ? (
        <section className="flex gap-4 justify-around"></section>
      ) : (
        ""
      )}

      <h2 className="text-2xl text-center mb-3">Mis Productos</h2>
      <ul className="w-full mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center justify-center gap-y-20 gap-x-20 mt-7 mb-5">
        {products.map((product) => (
          <li key={product.product_id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Main>
  );
}
