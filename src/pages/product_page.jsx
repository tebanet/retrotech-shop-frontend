import { useRef, useState, useEffect, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { toast } from "sonner";
import { Main } from "../components/main";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { getProductData } from "../api/get-product-data";
import { Avatar, Button } from "@mui/material";
import { useCurrentUser } from "../hooks/use-current-user";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { getPlaceOfSale } from "../hooks/get-place-of-sale";
import { API_HOST } from "../utils/constants";
import { OrderProductForm } from "../forms/order-product-form";
import { postOrder } from "../api/post-order";
import { deleteProduct } from "../api/delete-product";
import { getUserData } from "../api/get-user-data";

export function ProductPage() {
  const currentUser = useCurrentUser();
  const [ownership, setOwnership] = useState(false);
  const [login, setLogin] = useState(false);
  const [sold, setSold] = useState(false);
  const [buy, setBuy] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  let { product_id } = useParams();
  const [productData, setProductData] = useState([]);
  const fileInputRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [accountOwnership, setAccountOwnership] = useState(false);
  const [userData, setUserData] = useState({});

  async function fetchProductData() {
    const result = await getProductData(product_id);
    if (result.status === "ok") {
      setProductData(result.data);
    } else {
      navigate("/404");
    }
    if (result.data.status !== "available") {
      setSold(true);
    }
  }

  const fetchUserData = useCallback(async () => {
    const result = await getUserData(productData.username);
    if (result.status === "ok") {
      setUserData(result.data);
    } else {
      navigate("/404");
    }
  }, [productData.username, navigate]);

  const token = localStorage.getItem("userToken");

  const shortDate = dayjs(productData.createdAt).format("DD/MM/YYYY");

  const placeOfSaleDisplayName = getPlaceOfSale(productData.place_of_sale);

  const productStatus = (() => {
    switch (productData.status) {
      case "reserved":
        return (
          <p className="w-full bg-yellow-500 text-white py-2 px-4 rounded-full font-bold hover:bg-yellow-600">
            <TimerOutlinedIcon fontSize="inherit" /> Reservado
          </p>
        );
      case "available":
        return (
          <p className="w-full bg-green-500 text-white py-2 px-4 rounded-full font-bold hover:bg-green-600">
            <CheckOutlinedIcon fontSize="inherit" /> Disponible
          </p>
        );
      case "sold out":
        return (
          <p className="w-full bg-red-500 text-white py-2 px-4 rounded-full font-bold hover:bg-red-600">
            <CloseOutlinedIcon fontSize="inherit" /> Vendido
          </p>
        );
      default:
        return null;
    }
  })();

  const checkOwnership = useCallback(() => {
    if (productData.username === currentUser?.username) {
      setAccountOwnership(true);
    }
  }, [productData.username, currentUser]);

  function checkLogin() {
    const isLoggedIn = currentUser !== null;
    setLogin(isLoggedIn);
  }

  useEffect(() => {
    fetchProductData();
    checkOwnership();
    checkLogin();
  }, [product_id, fetchProductData, checkOwnership, checkLogin]);

  const [formData, setFormData] = useState({
    message: "",
    delivery_place: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderCreated = await postOrder(
      product_id,
      formData.message,
      formData.delivery_place
    );

    if (orderCreated) {
      navigate("/");
      toast.success("¡Pedido hecho! Ahora solo falta esperar 😊");
    }
  };

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    await deleteProduct(product_id);
    setShowConfirm(false);
    navigate("/"); // Redirect to home page after deletion
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

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
    if (e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("product_id", product_id);
    formData.append("product_image", file);

    try {
      const response = await fetch(API_HOST + "/products/new-image", {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("La imagen se ha subido correctamente.");
        fetchProductData(productData);
      } else {
        toast.error("Ha fallado la subida de la imagen.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Main>
      <section className="bg-gray-100 py-8">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="flex flex-col md:flex-row -mx-4">
            <section className="md:flex-1 px-4">
              <span
                className="h-[460px] rounded-lg bg-gray-300 mb-4 relative" // Add relative positioning
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {isHovered && accountOwnership && (
                  <IconButton
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)", // Center the icon horizontally and vertically
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
                  className="w-full h-full object-cover"
                  src={API_HOST + "/uploads/" + productData.product_image}
                  alt={"Imagen de " + productData.product_image}
                />
              </span>
            </section>
            <section className="md:flex-1 px-4 flex flex-col justify-between">
              <h2 className="text-2xl font-bold mb-2">
                {productData.product_title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {productData.description}
              </p>
              <span className="flex justify-between mb-4">
                <span className="mr-4">
                  <span className="font-bold text-gray-700">Precio: </span>
                  <span className="text-gray-600">{productData.price} €</span>
                </span>
                <span>
                  <span id="status-span" className="text-gray-600">
                    {productStatus}
                  </span>
                </span>
              </span>

              <section id="info">
                <p className="font-bold text-gray-700 mb-3">
                  Publicado desde:{" "}
                  <span className="font-light">{shortDate}</span>
                </p>
                <p className="font-bold text-gray-700 mb-3">
                  Método de entrega:{" "}
                  <span className="font-light">{placeOfSaleDisplayName}</span>
                </p>
                <p className="font-bold text-gray-700 mb-3">
                  Está ubicado en:{" "}
                  <span className="font-light">{productData.location}</span>
                </p>
              </section>

              <span className="flex flex-col items-end mt-auto">
                <p className="text-gray-600 font-bold text-sm mb-3">
                  Vendido por
                </p>
                <Link
                  className="text-gray-600 text-sm mb-3"
                  to={"/users/" + productData.username}
                >
                  <Avatar alt="Foto de perfil" src={productData.profile_pic} />
                  <p className="text-center">{productData.username}</p>
                </Link>
              </span>
            </section>
          </section>
        </section>
        <span className="flex flex-col items-center md:flex-row justify-center mt-5 gap-4">
          {accountOwnership ? (
            <span className="flex gap-4">
              <Link to={"/products/" + productData.product_id + "/update"}>
                <Button variant="outlined" color="secondary">
                  <EditNoteIcon />
                  Editar producto
                </Button>
              </Link>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
                Eliminar producto
              </Button>
            </span>
          ) : (
            !sold == true &&
            login && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setBuy(!buy);
                }}
              >
                <ShoppingBagIcon />
                ¡Quiero comprarlo!
              </Button>
            )
            /* <Button variant="contained">¡Quiero comprarlo!</Button> */
          )}
          {buy ? (
            <OrderProductForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          ) : (
            ""
          )}
          {showConfirm && (
            <span className="flex flex-col mx-auto gap-4 w-full lg:w-8/12 xl:w-7/12 bg-white rounded-lg shadow-md p-5">
              <h1 className="self-center">
                ¿Estás seguro de que quieres eliminar{" "}
                {productData.product_title}?
              </h1>
              <Button
                type="submit"
                variant="outlined"
                color="error"
                onClick={handleConfirmDelete}
              >
                Si
              </Button>
              <Button
                type="submit"
                variant="outlined"
                color="secondary"
                onClick={handleCancelDelete}
              >
                No
              </Button>
            </span>
          )}
        </span>
      </section>
    </Main>
  );
}
