import { Main } from "../components/main";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { getProductData } from "../api/get-product-data";
import { Button } from "@mui/material";
import { useCurrentUser } from "../hooks/use-current-user";

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
			<section className="flex justify-center">
				<img
					className="max-w-[15rem]"
					src={"http://localhost:3000/uploads/" + productData.product_image}
					alt={"foto de " + productData.product_title}
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
				<Link to={"/users/" + productData.username}>
					<h4>{productData.username}</h4>
				</Link>
			</section>
		</Main>
	);
}
