import { useEffect, useState } from "react";
import { Main } from "../components/main";
import { getProductsFiltered } from "../api/get-products-filtered";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/product-card";
import { SearchForm } from "../forms/search-form";

export function SearchPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [products, setProducts] = useState([]);

	async function filterProducts() {
		const result = await getProductsFiltered(searchParams.toString());
		if (result.status == "ok") {
			setProducts(result.data);
		}
	}

	useEffect(() => {
		filterProducts();
	}, [searchParams]);

	return (
		<Main>
			<SearchForm />
			<ul className="flex flex-row flex-wrap justify-evenly gap-8">
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
