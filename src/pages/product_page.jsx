import { Main } from "../components/main";
import { useEffect, useState } from "react";
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
import { getPlaceOfSale } from "../hooks/get-place-of-sale";
import { API_HOST } from "../utils/constants";
import { OrderProductForm } from "../forms/order-product-form";
import { postOrder } from "../api/post-order";
import { toast } from "sonner";

export function ProductPage() {
  const currentUser = useCurrentUser();
  const [ownership, setOwnership] = useState(false);

  const [sold, setSold] = useState(false);
  const [buy, setBuy] = useState(false);

  const navigate = useNavigate();

  let { product_id } = useParams();
  const [productData, setProductData] = useState([]);
  async function fetchProductData() {
    const result = await getProductData(product_id);
    if (result.status == "ok") {
      setProductData(result.data);
    } else {
      navigate("/404");
    }
    if (result.data.status != "available") {
      setSold(true);
    }
  }
  const shortDate = dayjs(productData.createdAt).format("DD/MM/YYYY");

  const placeOfSaleDisplayName = getPlaceOfSale(productData.place_of_sale);

  const productStatus = (() => {
    switch (productData.status) {
      case "reserved":
        return (
          <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded-full font-bold hover:bg-yellow-600 cursor-auto">
            <TimerOutlinedIcon fontSize="inherit" /> Reservado
          </button>
        );
      case "available":
        return (
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded-full font-bold hover:bg-green-600 cursor-auto">
            <CheckOutlinedIcon fontSize="inherit" /> Disponible
          </button>
        );
      case "sold out":
        return (
          <button className="w-full bg-red-500 text-white py-2 px-4 rounded-full font-bold hover:bg-red-600 cursor-auto">
            <CloseOutlinedIcon fontSize="inherit" /> Vendido
          </button>
        );
      default:
        return null;
    }
  })();

  async function checkOwnership() {
    if (productData.username === currentUser?.username) {
      setOwnership(true);
    } else {
      setOwnership(false);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, [product_id]);

  useEffect(() => {
    checkOwnership();
  }, [fetchProductData]);

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

  return (
    <Main>
      <section className="bg-gray-100 py-8">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="flex flex-col md:flex-row -mx-4">
            <section className="md:flex-1 px-4">
              <span className="h-[460px] rounded-lg bg-gray-300 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={
                    "http://localhost:3000/uploads/" + productData.product_image
                  }
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
        <span className="flex flex-col items-center justify-center mt-4 mb-4 gap-4">
          {ownership ? (
            <Link to={"/products/" + productData.product_id + "/edit"}>
              <button className="w-1/4 bg-secondary text-white mt-5 py-2 px-4 rounded-full font-bold hover:bg-gray-400">
                <EditNoteIcon />
                Editar producto
              </button>
            </Link>
          ) : (
            !sold == true && (
              <button
                onClick={() => {
                  setBuy(!buy);
                }}
                className="w-1/4 bg-secondary text-white py-2 px-4 rounded-full font-bold hover:bg-gray-400"
              >
                <ShoppingBagIcon />
                ¡Quiero comprarlo!
              </button>
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
        </span>
      </section>
    </Main>
  );
}
