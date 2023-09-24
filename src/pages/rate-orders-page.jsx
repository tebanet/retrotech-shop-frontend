import { useNavigate, useParams } from "react-router-dom";
import { Main } from "../components/main";
import { useEffect, useState } from "react";
import { OrderCard } from "../components/order-card";
import { getUnratedOrders } from "../api/get-unrated-orders";
import { RateOrderCard } from "../components/rate-order-card";

export function RateOrdersPage() {
	const navigate = useNavigate();
	let { username } = useParams();

	const [userOrders, setUserOrders] = useState([]);

	async function fetchUserOrders() {
		const result = await getUnratedOrders(username);
		if (result.status == "ok") {
			setUserOrders(result.data);
		}
		if (result.error && result.message.includes("otras personas")) {
			navigate("/404");
		}
	}

	useEffect(() => {
		fetchUserOrders();
	}, [username]);

	return (
		<Main>
			<h1 className="text-3xl self-center">Pedidos pendientes de valorar</h1>
			<ul className="flex flex-col flex-wrap justify-around gap-4 md:flex-nowrap md:overflow-x-scroll">
				{userOrders.map((order) => {
					return (
						<li key={order.orderId}>
							<RateOrderCard order={order} />
						</li>
					);
				})}
			</ul>
		</Main>
	);
}
