import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { OrderStatus } from "../utils/order-status";
import { API_HOST } from "../utils/constants";

export function OrderCard({ order }) {
	const shortDate = dayjs(order.order_date).format("DD/MM/YYYY");

	return (
		<article className="flex border border-black rounded-xl gap-10">
			<section>
				<Link to={"/products/" + order.product_id}>
					<img
						className="max-w-[5rem] rounded-xl"
						src={API_HOST + "/uploads/" + order.product_image}
						alt={"image of " + order.product_tite}
					/>
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
