import { useState } from "react";

export function ProductCard({ product }) {
	const [isHovered, setHovered] = useState(false);
	const toggleHover = () => setHovered(!isHovered);

	return (
		<article className="flex py-2 w-[10.75rem] h-52" onMouseEnter={toggleHover}>
			<section className="flex flex-col">
				<img
					src={product.img}
					alt={"Picture of " + product.name}
					className={isHovered ? "animate__animated animate__pulse" : ""}
				/>
				<h2 className="text-[var(--quaternary-color)]">{product.price}</h2>
				<p className="text-[var(--quaternary-color)]">{product.name}</p>
			</section>
		</article>
	);
}
