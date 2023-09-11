import { Container } from "@mui/material";
import { Main } from "../components/main";
import { ProductCard } from "../components/product-card";
import fake from "../data/fakeproducts.json";

export function IndexPage() {
	return (
		<Main>
			<h2 className="text-4xl block">¡Productos nuevos!</h2>
			<Container maxWidth="sm">
				<ul className="flex flex-row justify-start gap-4 overflow-x-scroll min-h-[21.5rem]">
					{fake.map((fake) => {
						return (
							<li>
								<ProductCard key={fake.id} product={fake} />
							</li>
						);
					})}
				</ul>
			</Container>
		</Main>
	);
}
