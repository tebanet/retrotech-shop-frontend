import { Main } from "../components/main";
import { useEffect, useState } from "react";
import { getUserData } from "../api/get-user-data";
import { Avatar, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { ProductCard } from "../components/product-card";
import { getUserProducts } from "../api/get-all-products-by-username";
import { useCurrentUser } from "../hooks/use-current-user";

export function UserPage() {
	const navigate = useNavigate();

	const [accountOwnership, setAccountOwnership] = useState(false);

	const currentUser = useCurrentUser();

	const checkOwnership = () => {
		if (username === currentUser?.username) {
			setAccountOwnership(true);
		}
	};

	let { username } = useParams();
	const [userData, setUserData] = useState([]);
	async function fetchUserData() {
		const result = await getUserData(username);
		if (result.status == "ok") {
			setUserData(result.data);
		} else {
			navigate("/404");
		}
	}
	const shortDate = dayjs(userData.createdAt).format("DD/MM/YYYY");

	const [products, setProducts] = useState([]);
	async function fetchUserProducts() {
		const result = await getUserProducts(username);
		if (result.status == "ok") {
			setProducts(result.data);
		}
	}

	useEffect(() => {
		fetchUserData();
		fetchUserProducts();
		checkOwnership();
	}, [username]);

	return (
		<Main>
			<section className="flex">
				<Avatar
					sx={{ width: 56, height: 56 }}
					src={userData?.profile_pic}
					alt={"foto de perfil de " + userData.username}
				/>
				<section className="flex flex-col pl-4">
					<p>{userData.username}</p>
					<p>{userData.media_valoracion} Valoracion</p>
					<p>Usuario creado: {shortDate}</p>
				</section>
			</section>
			{accountOwnership ? (
				<section className="flex gap-4 justify-around">
					<Link to={"/users/" + username + "/orders"}>
						<Button variant="contained" color="success" sx={{ width: "12rem" }}>
							Ofertas
						</Button>
					</Link>
					<Link to={"/users/" + username + "/offers"}>
						<Button variant="contained" color="error" sx={{ width: "12rem" }}>
							Pedidos
						</Button>
					</Link>
				</section>
			) : (
				""
			)}
			<h2 className="text-2xl">Productos</h2>
			<ul className="flex flex-row flex-wrap justify-around gap-8 md:flex-nowrap md:overflow-x-scroll">
				{products.map((product) => {
					return (
						<li key={product.product_id}>
							<ProductCard product={product} />
						</li>
					);
				})}
			</ul>
		</Main>
	);
}
