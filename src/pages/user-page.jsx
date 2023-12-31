import { useEffect, useRef, useState, useCallback } from "react";
import { getUserData } from "../api/get-user-data";
import { Button, Rating } from "@mui/material";
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
import EditIcon from "@mui/icons-material/Edit";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
export function UserPage() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);

  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    if (fileInputRef) {
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
          fetchUserData(username);
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
            {!isHovered ||
              (accountOwnership && (
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
              ))}

            <img
              className="w-32 h-32 rounded-full mx-auto"
              src={userData.profile_pic}
              alt={"Foto de " + userData.username}
            />
          </span>
          <h2 className="text-center text-2xl font-semibold mt-3">
            {userData.username}
          </h2>
          <h3 className="text-center text-gray-600 mt-1">
            {userData.media_valoracion ? (
              <span className="flex align-middle justify-center">
                <Rating value={userData.media_valoracion} readOnly /> (
                {userData.media_valoracion})
              </span>
            ) : (
              "Sin valoraciones"
            )}
          </h3>
          <span className="flex justify-center mt-5">
            <p>Usuario desde: {shortDate}</p>
          </span>
          <span className="mt-5">
            <h3 className="text-xl font-semibold">Bio</h3>
            <p className="text-gray-600 mt-2">{userData.bio}</p>
          </span>
          {accountOwnership ? (
            <span className="flex flex-row justify-center mt-5 gap-4">
              <Link to={"/users/update"}>
                <Button variant="outlined" color="secondary">
                  {isMobileView ? <EditIcon /> : "Editar información"}
                </Button>
              </Link>
              <Link to={"/users/" + username + "/orders"}>
                <Button variant="outlined" color="secondary">
                  {isMobileView ? <ShoppingBagIcon /> : "Mis pedidos"}
                </Button>
              </Link>
              <Link to={"/users/" + username + "/offers"}>
                <Button variant="outlined" color="secondary">
                  {isMobileView ? <LocalOfferIcon /> : "Mis ofertas"}
                </Button>
              </Link>
            </span>
          ) : (
            ""
          )}
        </section>
      </article>
      {accountOwnership ? (
        <section className="flex gap-4 justify-around"></section>
      ) : (
        ""
      )}

      <h2 className="text-2xl text-center mb-3">Mis Productos</h2>
      <ul className="flex flex-row flex-wrap justify-around gap-16">
        {products.map((product) => (
          <li key={product.product_id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Main>
  );
}
