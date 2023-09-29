import { useNavigate, useParams } from "react-router-dom";
import { Main } from "../components/main";
import { useEffect, useState } from "react";
import { getUserOrders } from "../api/get-user-orders";
import { OrderCard } from "../components/order-card";

export function OrdersPage() {
	const navigate = useNavigate();
	let { username } = useParams();

	const [userOrders, setUserOrders] = useState([]);

	async function fetchUserOrders() {
		const result = await getUserOrders(username);
		if (result.status == "ok") {
			setUserOrders(result.orders);
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
			<h1 className="text-3xl self-center">Estado de tus pedidos</h1>
			<ul className="flex flex-col flex-wrap justify-around gap-4 md:flex-nowrap md:overflow-x-scroll">
				{userOrders.map((order) => {
					return (
						<li key={order.order_id}>
							<OrderCard order={order} />
						</li>
					);
				})}
			</ul>
		</Main>
	);
}
