import { Container } from "@mui/material";
import { Main } from "../components/main";
import { ProductCard } from "../components/product-card";
import { useEffect, useState } from "react";
import { getAllProducts } from "../api/get-all-products";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { Link } from "react-router-dom";

export function IndexPage() {
	const [products, setProducts] = useState([]);

	async function fetchAllProducts() {
		const result = await getAllProducts();
		if (result.status == "ok") {
			setProducts(result.data);
		}
	}

	useEffect(() => {
		fetchAllProducts();
	}, []);

	return (
		<Main>
			<nav className="grid grid-cols-2 grid-rows-2 gap-4 md:flex md:justify-around">
				<Link className="flex flex-col items-center" to="/category/accessories">
					<HeadphonesOutlinedIcon fontSize="large" /> Accesorios
				</Link>
				<Link className="flex flex-col items-center" to="/category/pc">
					<ComputerOutlinedIcon fontSize="large" /> Ordenadores
				</Link>
				<Link
					className="flex flex-col items-center row-start-2"
					to="/category/photography"
				>
					<CameraAltOutlinedIcon fontSize="large" /> Fotografia
				</Link>
				<Link
					className="flex flex-col items-center row-start-2"
					to="/category/videogame"
				>
					<VideogameAssetOutlinedIcon fontSize="large" /> Videojuegos
				</Link>
			</nav>
			<h2 className="text-4xl block">¡Productos nuevos!</h2>
			<Container maxWidth="2xl">
				<ul className="flex flex-row flex-wrap justify-start gap-8 md:flex-nowrap md:overflow-x-scroll">
					{products.map((product) => {
						return (
							<li key={product.product_id}>
								<ProductCard product={product} />
							</li>
						);
					})}
				</ul>
			</Container>
		</Main>
	);
}
