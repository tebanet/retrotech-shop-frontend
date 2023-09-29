import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import { OrderStatus } from "../utils/order-status";
import { Button } from "@mui/material";
import { API_HOST } from "../utils/constants";

export function RateOrderCard({ order }) {
	const shortDate = dayjs(order.order_date).format("DD/MM/YYYY");
	let { username } = useParams();

	return (
		<article className="flex flex-wrap justify-center border border-black rounded-xl">
			<section>
				<Link to={"/products/" + order.id_product}>
					<img
						className="max-w-[5rem] rounded-xl"
						src={API_HOST + "/uploads/" + order.product_image}
						alt={"image of " + order.product_title}
					/>
				</Link>
			</section>
			<section className="flex flex-col justify-between mx-[2.70rem]">
				<section className="flex justify-between min-w-[15rem]">
					<b>{order.product_title}</b>
					<p>{shortDate}</p>
				</section>
				<section className="flex justify-between min-w-[15rem]">
					<p>
						<Link to={"/users/" + order.username}>{order.username}</Link>
					</p>

					<span>
						<OrderStatus order={order} />
					</span>
				</section>
				<section className="flex justify-center min-w-[15rem]">
					<p className="text-green-500">{order.price}€</p>
				</section>
			</section>
			<section className="py-1 gap-2 flex flex-col items-center">
				<Link to={"/users/" + username + "/orders/rate/" + order.order_id}>
					<Button variant="contained" color="success">
						Enviar valoración
					</Button>
				</Link>
			</section>
		</article>
	);
}
