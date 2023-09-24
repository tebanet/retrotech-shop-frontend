import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { OrderStatus } from "../utils/order-status";

export function RateOrderCard({ order }) {
	const shortDate = dayjs(order.order_date).format("DD/MM/YYYY");

	console.log(order);

	return (
		<article className="flex border border-black rounded-xl gap-10">
			<section>
				<Link to={"/products/" + order.id_product}>
					{/* <img
						className="max-w-[5rem] rounded-xl"
						src={"http://localhost:3000/uploads/" + order.product_image}
						alt={"image of " + order.product_title}
					/> */}
					Enlace a producto :)
				</Link>
			</section>
			<section className="flex flex-col justify-between">
				<section className="flex justify-between min-w-[15rem]">
					<b>{order.product_title}</b>
					<p>{shortDate}</p>
				</section>
				<section className="flex justify-between min-w-[15rem]">
					<p>
						<Link to={"/users/" + order.seller}>{order.seller}</Link>
					</p>

					<p>
						<OrderStatus order={order} />
					</p>
				</section>
				<section className="flex justify-center min-w-[15rem]">
					<p className="text-green-500">{order.price}€</p>
				</section>
			</section>
		</article>
	);
}
