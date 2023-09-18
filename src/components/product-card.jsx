export function ProductCard({ product }) {
  return (
    <article className="flex w-[10.75rem] h-52 md:h-60">
      <section className="flex flex-col h-max">
        <img
          src={"http://localhost:3000/uploads/" + product.product_image}
          alt={"Picture of " + product.product_title}
        />
        <h2 className="text-[var(--quaternary-color)]">{product.price}</h2>
        <p className="text-[var(--quaternary-color)]">
          {product.product_title}
        </p>
      </section>
    </article>
  );
}
