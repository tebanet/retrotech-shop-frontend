import { Link } from "react-router-dom";
import { API_HOST } from "../utils/constants";
import InfoIcon from "@mui/icons-material/Info";
import { getCategoryDisplayName } from "../hooks/get-category-display-name";
export function ProductCard({ product }) {
	const categoryDisplayName = getCategoryDisplayName(product.category);

	return (
		<>
			<article className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
				<Link to={"/products/" + product.product_id}>
					<img
						src={API_HOST + "/uploads/" + product.product_image}
						alt={"Picture of " + product.product_title}
						className="h-80 w-72 object-cover rounded-t-xl"
					/>
				</Link>
				<section className="p-2">
					<h3 className="text-gray-400 mr-3 uppercase text-xs">
						<Link to={"/category/" + product.category}>
							{categoryDisplayName}
						</Link>
					</h3>
					<h2 className="text-lg font-bold text-black truncate block capitalize">
						{product.product_title}
					</h2>
					<section className="flex items-center">
						<p className="text-lg font-semibold text-black cursor-auto my-3">
							{product.price} €
						</p>
						<span className="ml-auto">
							<InfoIcon />
						</span>
					</section>
				</section>
			</article>
			    
		</>
	);
}
