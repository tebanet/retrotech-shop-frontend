import { useNavigate, useParams } from "react-router-dom";
import { Main } from "../components/main";
import { useEffect, useState } from "react";
import { getOrderInfo } from "../api/get-order-info";
import dayjs from "dayjs";
import { Button, Rating, TextField } from "@mui/material";
import { rateOrder } from "../api/post-order-rate";
import { toast } from "sonner";

export function RateOrder() {
	const navigate = useNavigate();
	let { username, orderId } = useParams();
	const [value, setValue] = useState(3);
	const [order, setOrder] = useState(null);

	async function fetchUserOrders() {
		const result = await getOrderInfo(username, orderId);

		if (result.status == "ok") {
			setOrder(result.orderInfo);
		}
		if (result.error && result.message.includes("otras personas")) {
			navigate("/404");
		}
	}

	const [formData, setFormData] = useState({
		comentaries: "",
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

		const rateSent = await rateOrder(
			username,
			orderId,
			value,
			formData.comentaries
		);

		if (rateSent) {
			navigate("/users/" + username + "/orders/rate");
			toast.success("¡Gracias por valorar el producto! 😊");
		}
	};

	useEffect(() => {
		fetchUserOrders();
	}, []);
	return (
		<Main>
			<section className="flex justify-center">
				<img
					className="max-w-[15rem]"
					src={"http://localhost:3000/uploads/" + order?.product_image}
					alt={"foto de " + order?.product_title}
				/>
			</section>
			<section className="flex flex-col pl-4">
				<h1>
					{order?.product_title} - {order?.price}€ - {order?.category} -{" "}
					{order?.status}
				</h1>
				<h2>
					Puesto a la venta: {dayjs(order?.order_date).format("DD/MM/YYYY")}{" "}
					{order?.location}
				</h2>
				<h3>{order?.description}</h3>
				<h4>{order?.username}</h4>
			</section>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 md:px-44 lg:px-60 xl:px-96"
			>
				<Rating
					defaultValue={3}
					name="valoracion"
					className="self-center"
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
				/>
				<TextField
					label="¿Quieres añadir algún comentario?"
					name="comentaries"
					value={formData.comentaries}
					onChange={handleInputChange}
				/>
				<Button type="submit" variant="contained" color="primary">
					¡Manda tu valoración!
				</Button>
			</form>
		</Main>
	);
}
