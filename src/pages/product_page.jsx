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

export function ProductPage() {
  const currentUser = useCurrentUser();
  const [ownership, setOwnership] = useState(false);

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
  }
  const shortDate = dayjs(productData.createdAt).format("DD/MM/YYYY");

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

  const checkOwnership = () => {
    if (productData.username === currentUser?.username) {
      setOwnership(true);
    }
  };

  useEffect(() => {
    checkOwnership();
  }, [productData]);

  useEffect(() => {
    fetchProductData();
  }, [product_id]);

  console.log(productData);

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
              <span className="flex justify-center -mx-2 mb-4">
                {ownership ? (
                  <Link
                    className="self-center"
                    to={"/products/" + productData.product_id + "/edit"}
                  >
                    <button className="w-full bg-secondary text-white mt-5 py-2 px-4 rounded-full font-bold hover:bg-gray-800">
                      <EditNoteIcon />
                      Editar producto
                    </button>
                    {/* <Button variant="contained">Editar producto</Button> */}
                  </Link>
                ) : (
                  <Link
                    className="self-center"
                    to={"/products/" + productData.product_id + "/order"}
                  >
                    <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">
                      <ShoppingBagIcon />
                      Quiero comprarlo!
                    </button>
                    {/* <Button variant="contained">¡Quiero comprarlo!</Button> */}
                  </Link>
                )}
              </span>
            </section>
            <section className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold mb-2">
                {productData.product_title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {productData.description}
              </p>
              <span className="flex justify-between mb-4">
                <span className="mr-4">
                  <span className="font-bold text-gray-700">Precio: </span>
                  <span className="text-gray-600">€ {productData.price}</span>
                </span>
                <span>
                  <span id="status-span" className="text-gray-600">
                    {productStatus}
                  </span>
                </span>
              </span>

              <section className="mb-4">
                <p className="font-bold text-gray-700">
                  Publicado desde:{" "}
                  <span className="font-light">{shortDate}</span>
                </p>
                <p className="font-bold text-gray-700">
                  Se vende:{" "}
                  <span className="font-light">
                    {productData.place_of_sale}
                  </span>
                </p>
                <p className="font-bold text-gray-700">
                  Está ubicado en:{" "}
                  <span className="font-light">{productData.location}</span>
                </p>

                <p className="text-gray-600 text-sm mt-2">Vendido por</p>
                <Avatar
                  alt="Foto de perfil"
                  src={productData.username.profile_pic}
                />
                <Link to={"/users/" + productData.username}>
                  <h4>{productData.username}</h4>
                </Link>
              </section>
            </section>
          </section>
        </section>
      </section>
      <section className="flex justify-center">
        <img
          className="max-w-[15rem]"
          src={"http://localhost:3000/uploads/" + productData.product_image}
          alt={"Foto de " + productData.product_title}
        />
      </section>
      {ownership ? (
        <Link
          className="self-center"
          to={"/products/" + productData.product_id + "/edit"}
        >
          <Button variant="contained">Editar producto</Button>
        </Link>
      ) : (
        <Link
          className="self-center"
          to={"/products/" + productData.product_id + "/order"}
        >
          <Button variant="contained">¡Quiero comprarlo!</Button>
        </Link>
      )}
      <section className="flex flex-col pl-4">
        <h1>
          {productData.product_title} - {productData.price}€ -{" "}
          {productData.category} - {productData.status}
        </h1>
        <h2>
          Puesto a la venta: {shortDate} {productData.location}
        </h2>
        <h3>{productData.description}</h3>
      </section>
    </Main>
  );
}

// export function ProductPage() {
// 	const currentUser = useCurrentUser();
// 	const [ownership, setOwnership] = useState(false);

// 	const navigate = useNavigate();

// 	let { product_id } = useParams();
// 	const [productData, setProductData] = useState([]);
// 	async function fetchProductData() {
// 		const result = await getProductData(product_id);
// 		if (result.status == "ok") {
// 			setProductData(result.data);
// 		} else {
// 			navigate("/404");
// 		}
// 	}
// 	const shortDate = dayjs(productData.createdAt).format("DD/MM/YYYY");

// 	const checkOwnership = () => {
// 		if (productData.username === currentUser?.username) {
// 			setOwnership(true);
// 		}
// 	};

// 	useEffect(() => {
// 		checkOwnership();
// 	}, [productData]);

// 	useEffect(() => {
// 		fetchProductData();
// 	}, [product_id]);

// 	return (
// 		<Main>
// 			<section className="flex justify-center">
// 				<img
// 					className="max-w-[15rem]"
// 					src={"http://localhost:3000/uploads/" + productData.product_image}
// 					alt={"foto de " + productData.product_title}
// 				/>
// 			</section>
// 			{ownership ? (
// 				<Link
// 					className="self-center"
// 					to={"/products/" + productData.product_id + "/edit"}
// 				>
// 					<Button variant="contained">Editar producto</Button>
// 				</Link>
// 			) : (
// 				<Link
// 					className="self-center"
// 					to={"/products/" + productData.product_id + "/order"}
// 				>
// 					<Button variant="contained">¡Quiero comprarlo!</Button>
// 				</Link>
// 			)}
// 			<section className="flex flex-col pl-4">
// 				<h1>
// 					{productData.product_title} - {productData.price}€ -{" "}
// 					{productData.category} - {productData.status}
// 				</h1>
// 				<h2>
// 					Puesto a la venta: {shortDate} {productData.location}
// 				</h2>
// 				<h3>{productData.description}</h3>
// 				<Link to={"/users/" + productData.username}>
// 					<h4>{productData.username}</h4>
// 				</Link>
// 			</section>
// 		</Main>
// 	);
// }
