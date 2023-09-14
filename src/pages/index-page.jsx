import { Container } from "@mui/material";
import { Main } from "../components/main";
import { ProductCard } from "../components/product-card";
import { useEffect, useState } from "react";
import { getAllProducts } from "../api/get-all-products";

export function IndexPage() {
	const [products, setProducts] = useState([]);

	async function fetchAllProducts() {
		const result = await getAllProducts();
		if (result.status == "ok") {
			setProducts(result.data);
		} else {
		}
	}

	useEffect(() => {
		fetchAllProducts();
	}, []);

	return (
		<Main>
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
