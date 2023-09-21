import { Main } from "../components/main";
import { useState, useEffect } from "react";
import { getProductByCategory } from "../api/get-product-by-category";
import { useNavigate, useParams } from "react-router-dom";
import { ProductCard } from "../components/product-card";

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

	return (
		<Main>
			<h2 className="text-2xl">{category}</h2>
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
