import { useNavigate, useParams } from "react-router-dom";
import { Main } from "../components/main";
import { useEffect, useState } from "react";
import { getUserOffers } from "../api/get-user-offers";
import { OfferCard } from "../components/offer-card";

export function OffersPage() {
	const navigate = useNavigate();
	let { username } = useParams();

	const [userOffers, setUserOffers] = useState([]);

	async function fetchUserOffers() {
		const result = await getUserOffers(username);
		if (result.status == "ok") {
			setUserOffers(result.orders);
		}
		if (result.error && result.message.includes("dueño")) {
			navigate("/404");
		}
	}

	useEffect(() => {
		fetchUserOffers();
	}, []);

	return (
		<Main>
			<h1 className="text-3xl self-center">Ofertas recibidas</h1>
			<ul className="flex flex-col flex-wrap justify-around gap-4 md:flex-nowrap md:overflow-x-scroll">
				{userOffers.map((offer) => {
					return (
						<li key={offer.orderId}>
							<OfferCard offer={offer} />
						</li>
					);
				})}
			</ul>
		</Main>
	);
}
