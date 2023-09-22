import { Main } from "../components/main";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { getProductData } from "../api/get-product-data";
import { OrderProductForm } from "../forms/order-product-form";
import { postOrder } from "../api/post-order";
import { toast } from "sonner";

export function OrderProductPage() {
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

	useEffect(() => {
		fetchProductData();
	}, []);

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
			<section className="flex justify-center">
				<img
					className="max-w-[15rem]"
					src={"http://localhost:3000/uploads/" + productData.product_image}
					alt={"foto de " + productData.product_title}
				/>
			</section>
			<section className="flex flex-col pl-4">
				<h1>
					{productData.product_title} - {productData.price}€ -{" "}
					{productData.category} - {productData.status}
				</h1>
				<h2>
					Puesto a la venta: {shortDate} {productData.location}
				</h2>
				<h3>{productData.description}</h3>
				<h4>{productData.username}</h4>
			</section>
			<OrderProductForm
				formData={formData}
				handleInputChange={handleInputChange}
				handleSubmit={handleSubmit}
			/>
		</Main>
	);
}
