import dayjs from "dayjs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { OrderStatus } from "../utils/order-status";
import { Button } from "@mui/material";
import { patchOffer } from "../api/patch-offer";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function OfferCard({ offer }) {
	const navigate = useNavigate();
	let { username } = useParams();
	const shortDate = dayjs(offer.order_date).format("DD/MM/YYYY");

	const [status, setStatus] = useState(false);
	function checkStatus() {
		if (offer?.order_status == "pending") {
			setStatus(true);
		}
	}

	function acceptOffer() {
		const status = "accepted";
		patchOffer(username, offer.orderId, status);
		toast.success("Pedido aceptado 🤑");
		navigate("/users/" + username);
	}

	function rejectOffer() {
		const status = "rejected";
		patchOffer(username, offer.orderId, status);
		toast.success("Pedido rechazado 😭");
		navigate("/users/" + username);
	}

	useEffect(() => {
		checkStatus();
	}, []);

	return (
		<article className="flex flex-wrap justify-center border border-black rounded-xl">
			<section>
				<Link to={"/products/" + offer.product_id}>
					<img
						className="max-w-[5rem] rounded-xl"
						src={offer.product_image}
						alt={"image of " + offer.product_tite}
					/>
				</Link>
			</section>
			<section className="flex flex-col justify-between mx-[2.70rem]">
				<section className="flex justify-between min-w-[15rem]">
					<b>{offer.product_title}</b>
					<p>{shortDate}</p>
				</section>
				<section className="flex justify-between min-w-[15rem]">
					<p>
						<Link to={"/users/" + offer.buyer}>{offer.buyer}</Link>
					</p>
					<OrderStatus order={offer} />
				</section>
				<section className="flex justify-center min-w-[15rem]">
					<p className="text-green-500">{offer.price}€</p>
				</section>
			</section>
			{status ? (
				<section className="py-1 flex gap-2">
					<Button onMouseDown={acceptOffer} variant="contained" color="success">
						Aceptar oferta
					</Button>
					<Button onMouseDown={rejectOffer} variant="contained" color="error">
						Rechazar oferta
					</Button>
				</section>
			) : (
				""
			)}
		</article>
	);
}
