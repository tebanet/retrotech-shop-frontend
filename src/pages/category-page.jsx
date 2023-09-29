import { Main } from "../components/main";
import { useState, useEffect } from "react";
import { getProductByCategory } from "../api/get-product-by-category";
import { useNavigate, useParams } from "react-router-dom";
import { ProductCard } from "../components/product-card";
import { getCategoryDisplayName } from "../hooks/get-category-display-name";
import { Divider } from "@mui/material";

export function CategoryPage() {
	const navigate = useNavigate();

	let { category } = useParams();
	const [products, setProducts] = useState([]);

	async function fetchProducts() {
		const result = await getProductByCategory(category);
		if (result.status == "ok") {
			setProducts(result.data);
		} else {
			navigate("/404");
		}
	}

	useEffect(() => {
		fetchProducts();
	}, []);

	const categoryDisplayName = getCategoryDisplayName(category);

	return (
		<Main>
			<h2 className="text-2xl">{categoryDisplayName}</h2>
			<Divider />
			<ul className="flex flex-row flex-wrap justify-around gap-8">
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
